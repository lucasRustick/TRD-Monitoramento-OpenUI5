import { Users_Connections } from "bti_framework/connections/_base/users_connection";
import BaseController from "bti_framework/utils/base/BaseController";
import { ProjectUtils } from "bti_framework/utils/ProjectUtils";
import MessageBox from "sap/m/MessageBox";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class LoginController extends BaseController {

	public onInit(): void {
		this.createModels()

		localStorage.removeItem("token")
	}

	private createModels(): void {
		this.setModel(new JSONModel(), "formData")
	}

	public onAfterRendering(): void {
		ProjectUtils.events.fire("loginPageLoad")
	}

	public enter(): void {
		var { nome, senha } = this.getModel("formData").getData()

		if (!nome || !senha) {
			MessageBox.error("Por favor, preencha todos os campo para continuar o login")
			return
		}

		Users_Connections.login(nome, senha)
	}
}
