import BaseController from "bti_framework/utils/base/BaseController";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";
import { OnInit } from "./sections/onInit";
import { Database } from "bti_framework/connections/Database";
import MessageBox from "sap/m/MessageBox";
import { PasswordRecovery_Connections } from "bti_framework/connections/_base/passwordRecovery_connection";
import MessageToast from "sap/m/MessageToast";

export default class VisualizarRecuperacaoController extends BaseController {

	secOnInit = new OnInit(this)
	selected: Database.PasswordRecoverys | undefined

	public onInit(): void {
		this.secOnInit.createModels()
		this.secOnInit.renderTable()

		AssetsUtils.pooling(this.secOnInit.loadData, 1000, "Ocorreu um erro ao carregar a tabela!", this.secOnInit)
	}

	public async changeStatus(status: boolean) {
		if (!this.selected) {
			MessageBox.warning("Selecione um registro para aprovar!")
			return
		}

		let action = await AssetsUtils.asyncMessageBox("confirm", `Você deseja mesmo ${status ? "aprovar" : "rejeitar"} essa recuperação de senha?`)

		if (action !== "OK") {
			return
		}

		try {
			this.busy = true

			await PasswordRecovery_Connections.updateStatus(this.selected.IdPasswordRecovery, status)

			if (status) {
				MessageBox.success("Senha resetada para 123456.", { title: "Registro atualizado com sucesso!" })
			} else {
				MessageToast.show("Registro atualizado com sucesso!")
			}

			this.secOnInit.loadData()
		} catch (error) {
			AssetsUtils.handleError(error, "Ocorreu um erro ao atualizar o status!")
		} finally {
			this.busy = false
		}
	}
}
