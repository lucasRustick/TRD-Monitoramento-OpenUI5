import { Cadastro } from "bti_framework/Web-Assets/modulos/Cadastros/config.controller"
import Default, { query } from "bti_framework/Web-Assets/modulos/Cadastros/default.controller"
import ComboBox from "sap/m/ComboBox"
import IconTabBar from "sap/m/IconTabBar"
import Input from "sap/m/Input"
import MessageBox from "sap/m/MessageBox"
import Item from "sap/ui/core/Item"
import { Axios } from "axios";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils"

declare const axios: Axios
declare function md5(text: string): string

export const users: Cadastro = {
    childPath: "bti_framework.pages._base.cadastros.usuarios.registerData.users",
    data: {
        title: "Cadastro de Usuários",
        description: "Aqui você pode cadastrar novos usuários para sua empresa.",
        query: {
            id: "IdUser",
            get: "/Base/users/all/active/register",
            post: "/Base/users",
            put: "/Base/users/IdUser=",
            delete: "/Base/users/IdUser="
        },
        table: {
            title: "Usuários",
            columns: [
                { label: "ID", path: "IdUser", widthPoints: 0 },
                { label: "Nome", path: "Name" },
                { label: "Login", path: "Login" },
                { label: "Grupo", path: "UserGroups/0/Name" },
            ]
        },
        add: {
            title: "Novo usuário",
            defaultForm: {
                password: "123456"
            },
            name: "Name",
            ignore: ["IdUser", "UserGroups"],
            fields: [
                {
                    id: "Name",
                    component: Input,
                    label: "Nome",
                    props: {
                        width: "30rem",
                        type: "Text",
                        maxLength: 255,
                        value: "{campos>/Name}"
                    },
                    customData: {
                        required: true,
                        path: "Name"
                    }
                },
                {
                    id: "Login",
                    component: Input,
                    label: "Login",
                    props: {
                        width: "30rem",
                        type: "Text",
                        maxLength: 255,
                        value: "{campos>/Login}"
                    },
                    customData: {
                        required: true,
                        path: "Login"
                    }
                },
                {
                    id: "Password",
                    component: Input,
                    label: "Senha",
                    props: {
                        enabled: false,
                        width: "30rem",
                        maxLength: 255,
                        value: "{campos>/Password}",
                        tooltip: "Senha padrão"
                    }
                },
                {
                    id: "IdUserGroup",
                    component: ComboBox,
                    label: "Grupo",
                    props: {
                        width: "30rem",
                        selectedKey: "{campos>/IdUserGroup}"
                    },
                    customData: {
                        required: true,
                        path: "IdUserGroup"
                    },
                    items: {
                        query: "Base/user_groups/all/active/register",
                        bindingInfo: {
                            template: new Item({ text: "{Name}", key: "{IdUserGroup}" })
                        }
                    }
                },
            ]
        },
        custom: []
    }
}

export default class Usuarios extends Default {

    navToEdit() {
        this.buttonChange("editar")
        let campos = this.cadastroItemTabela
        let name = this.dadosCadastro.add.name || "name"
        let titulo = `Editar ${campos[name]}`

        delete campos.password

        this.formFragment.setTitle(titulo)
        this.getModel("campos").setData(campos);
        this.getById<IconTabBar>("barra").setSelectedKey("adicionar")
    }

    async create() {
        let body = this.getModel("campos").getData()

        if (this.checkRequiredFields(body)) {
            MessageBox.warning("Por favor, preencha os campos obrigatórios")
            return
        }

        let validar = this.validateFields(body)
        if (validar.fail) {
            MessageBox.warning(validar.message)
            return
        }

        // if (body.Login) {

        //     let { data } = await axios.get(`/api/User/?Login=${body.Login}&IdCompany=${body.IdCompany}`)

        //     if (data.length > 0) {
        //         return MessageBox.warning("Esse login já está sendo utilizado!")
        //     }
        // }

        body = this.fieldClearANDCheckInt(body)

        let query: query = this.tabela.data("query")

        try {
            await axios.post(query.post, body)

            await AssetsUtils.asyncMessageBox("information", "Registro realizado com sucesso!")
            this.getModel("campos").setData({ ...this.defaultForm })
        } catch (error) {
            AssetsUtils.handleError(error, "Erro ao criar um novo registro")
        }
    }

    async update() {
        // Pega o valor dos campos, verifica os campos obrigatórios e faz a requisição
        let body = this.getModel("campos").getData()
        let query: query = this.tabela.data("query")
        let id = this.cadastroItemTabela[query.id || "id"]

        if (this.checkRequiredFields(body)) {
            MessageBox.warning("Por favor, preencha os campos obrigatórios")
            return
        }

        let validar = this.validateFields(body)
        if (validar.fail) {
            MessageBox.warning(validar.message)
            return
        }

        // if (body.Login) {

        //     let { data } = await axios.get(`/api/User/?login=${body.Login}&IdCompany=${body.IdCompany}`)

        //     if (data.length > 0 && data[0].IdUser !== id) {
        //         return MessageBox.warning("Esse login já está sendo utilizado!")
        //     }
        // }

        body = this.fieldClearANDCheckInt(body)

        try {
            await axios.put(query.put + id, body)

            await AssetsUtils.asyncMessageBox("information", "Registro atualizado com sucesso!")
            this.navToTabela()
            this.getModel("campos").setData({ ...this.defaultForm })
        } catch (error) {
            AssetsUtils.handleError(error, "Erro ao atualizar registro")
        }
    }

    // Retira os objetos e transforma string em int quando necessário
    fieldClearANDCheckInt(body: any) {
        if (body.LastChange) {
            delete body.LastChange
        }

        body.password = body.password ? md5(body.password) : undefined

        if (!this.dadosCadastro.add.ignore) {
            return body
        }

        this.dadosCadastro.add.ignore.forEach((key) => {
            delete body[key]
        })

        return body
    }
}