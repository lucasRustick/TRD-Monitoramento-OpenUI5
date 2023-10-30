import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";
import { PasswordRecovery_Connections } from "bti_framework/connections/_base/passwordRecovery_connection";
import { ProjectUtils } from "bti_framework/utils/ProjectUtils";
import BaseController from "bti_framework/utils/base/BaseController";
import Input from "sap/m/Input";

export default class RecuperarSenhaController extends BaseController {

	onAfterRendering(): void {
		ProjectUtils.events.fire("loginPageLoad")
	}

	public async resetPassword() {
		try {
			this.busy = true

			let login = this.getById<Input>("user_login").getValue()
			await PasswordRecovery_Connections.create(login)
			this.busy = false

			await AssetsUtils.asyncMessageBox("success", "Pedido de recuperação de senha enviado com sucesso!")
			location.hash = "#/"
		} catch (error) {
			AssetsUtils.handleError(error, "Ocorreu um erro ao enviar a recuperação de senha!")
		} finally {
			this.busy = false
		}
	}
}
