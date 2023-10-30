import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";
import BaseController from "bti_framework/utils/base/BaseController";
import Page from "sap/m/Page";
import { RegisterData } from "./registerData";

export default class CadastroUsuarios extends BaseController {
    onInit(): void {
        this.renderRegisters()
    }

    private async renderRegisters() {
        let cadastro = await AssetsUtils.loadAssets("modulos.Cadastros", {
            listaCadastro: [
                { titulo: "Grupos de usuário", page: "user_groups" },
                { titulo: "Usuários", page: "users" },
            ],
            registerData: RegisterData
        })

        this.getById<Page>("page").addContent(cadastro.component)
    }
}