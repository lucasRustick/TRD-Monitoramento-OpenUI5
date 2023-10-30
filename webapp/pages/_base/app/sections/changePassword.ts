import { BaseSection } from "bti_framework/utils/base/BaseSection";
import AppController from "../config.controller";
import Dialog from "sap/m/Dialog";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import Title from "sap/m/Title";
import Label from "sap/m/Label";
import Input from "sap/m/Input";
import Button from "sap/m/Button";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";
import { Users_Connections } from "bti_framework/connections/_base/users_connection";
import MessageToast from "sap/m/MessageToast";

export class ChangePassword extends BaseSection<AppController>{
    public checkPassword(password: string) {
        const defaultPassword = md5('123456')

        if (password !== defaultPassword) {
            return
        }

        this.changePassword(password)
        MessageBox.warning("Por favor, faça a troca de senha", { title: "Você ainda está com a senha padrão!" })
    }

    public async changePassword(oldPassword: string, fromUser = false) {
        let { newPassword, confirm } = await this.getNewPassword(fromUser)

        let criptPassword = md5(newPassword)

        if (newPassword !== confirm) {
            this.changePassword(oldPassword, fromUser)
            MessageBox.warning("As senhas devem ser iguais!")
            return
        }

        const defaultPassword = "123456"

        if (newPassword === defaultPassword) {
            this.changePassword(oldPassword, fromUser)
            MessageBox.warning("A nova senha não pode ser igual a senha padrão!")
            return
        }

        if (criptPassword === oldPassword) {
            this.changePassword(oldPassword, fromUser)
            MessageBox.warning("As nova senha não pode ser igual a anterior!")
            return
        }

        this.sendNewPassword(criptPassword)
    }

    private getNewPassword(fromUser = false): Promise<{ newPassword: string, confirm: string }> {
        return new Promise((resolve) => {
            let dialog = new Dialog({
                title: "Insira sua nova senha!",
                closeOnNavigation: false,
                content: [
                    new SimpleForm({
                        width: "39vw",
                        editable: true,
                        content: [
                            new Label({
                                text: "Coloque sua nova senha"
                            }),
                            new Input({
                                type: "Password",
                                value: "{senha>/newPassword}"
                            }),
                            new Label({
                                text: "Confirme sua nova senha"
                            }),
                            new Input({
                                type: "Password",
                                value: "{senha>/confirm}"
                            }),
                        ]
                    })
                ],
                beginButton: new Button({
                    type: "Emphasized",
                    text: "Enviar",
                    press: () => {
                        dialog.close()
                        resolve((dialog.getModel("senha") as JSONModel).getData())
                    }
                }),
                endButton: fromUser ? new Button({
                    text: "Cancelar",
                    press: () => {
                        dialog.close()
                    }
                }) : null
            })

            dialog.open();
            dialog.addStyleClass("sapUiSizeCompact");
            dialog.setModel(new JSONModel(), "senha")
        })
    }

    private async sendNewPassword(newPassword: string) {
        try {
            this.instance.busy = true

            await Users_Connections.updatePassword(newPassword)
            MessageToast.show("Senha atualizada com sucesso!")
        } catch (error) {
            AssetsUtils.handleError(error, "Ocorreu um erro ao atualizar a senha!")
        } finally {
            this.instance.busy = false
        }
    }
}