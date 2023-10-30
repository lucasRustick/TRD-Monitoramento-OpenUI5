import BaseController from "bti_framework/utils/base/BaseController";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";
import ActionSheet from "sap/m/ActionSheet";
import Button from "sap/m/Button";
import ToolPage from "sap/tnt/ToolPage";
import Control from "sap/ui/core/Control";
import { onUserPress } from './sections/onUserPress'
import JSONModel from "sap/ui/model/json/JSONModel";
import { menu_lateral } from "bti_framework/model/UIdata/menu_lateral";
import { Users_Connections } from "bti_framework/connections/_base/users_connection";
import { ChangePassword } from "./sections/changePassword";
import { ProjectUtils } from "bti_framework/utils/ProjectUtils";

export default class AppController extends BaseController {

	secOnUserPress = new onUserPress(this)
	secChangePassword = new ChangePassword(this)

	public onInit(): void {
		ProjectUtils.events.add("loginPageLoad", "app", () => this.disablePageElements())

		this.getView().addStyleClass("sapUiSizeCompact")
		this.setModel(new JSONModel(), "menu_lateral")

		let route = this.getRouter().getRouteInfoByHash(location.hash.replace("#", ""))
		const ignoreRoutes = ["login", "recuperarSenha"]

		if (ignoreRoutes.includes(route.name) === false) {
			this.loadUserData()
			this.setSideMenuData()
		}
	}

	private disablePageElements(): void {
		this.getById<Control>("botaoMenu").setVisible(false)
		this.getById<Control>("botaoVoltar").setVisible(false)
		this.getById<Control>("botaoUsuario").setVisible(false)
		this.getById<Control>("menuLateral").setVisible(false)
		// this.getById<Control>("otbFooter").setVisible(false)
	}

	private async loadUserData(): Promise<void> {
		try {
			this.busy = true
			let user = await Users_Connections.getSelf()

			this.secChangePassword.checkPassword(user.Pass)
			this.getDefaultModel("dadosUsuario").setData(user)
		} catch (error: any) {
			if (error.response?.status === 401) {
				await AssetsUtils.asyncMessageBox("warning", "Por favor, faça login para continuar")
				location.hash = "/"
				location.reload()

				return null
			}

			AssetsUtils.handleError(error, "Ocorreu um erro ao buscar os dados do usuário")
		} finally {
			this.busy = false
		}
	}

	private async setSideMenuData() {
		let userData = await this.getUserData()

		let userGroupType = userData.UserGroups.at(0).IdUserGroupType

		this.getModel("menu_lateral").setData(menu_lateral.filter((item) => {

			item.items = item.items?.filter((subItem) => {
				return subItem.IdUserGroupType >= userGroupType
			})

			return item.IdUserGroupType >= userGroupType
		}))
	}

	// Expande e contrai o menu lateral
	public toggleMenu(): void {
		let page = this.getById<ToolPage>("toolPage")
		page.setSideExpanded(!page.getSideExpanded())
	}

	// Cria, abre e fecha o actionSheet ao clicar no botao de usuario
	public async onUserPress() {
		let usuario = await this.getUserData()

		// Cria o actionSheet, abre e guarda na variavel global
		let actionSheet = new ActionSheet({
			buttons: [
				new Button({ text: "Troca de senha", icon: "sap-icon://key", press: () => this.secOnUserPress.changePassWord(usuario.Pass) }),
				new Button({ text: "Sair", icon: "sap-icon://visits", press: () => this.secOnUserPress.exit() })
			]
		})

		actionSheet.openBy(this.getById<Button>("botaoUsuario"))
	}
}
