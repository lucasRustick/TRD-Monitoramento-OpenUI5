import DynamicPageTitle from "sap/f/DynamicPageTitle";
import Button from "sap/m/Button";
import IconTabBar from "sap/m/IconTabBar";
import InputBase from "sap/m/InputBase";
import MessageBox from "sap/m/MessageBox";
import SplitApp from "sap/m/SplitApp";
import Event from "sap/ui/base/Event";
import Table from "sap/ui/table/Table";
import Control from "sap/ui/core/Control";
import { CadastroType } from "./config.controller";
import IconTabFilter from "sap/m/IconTabFilter";
import { ColumnConfig } from "../../tabelaPadrao/config.controller";
import { Axios } from "axios";
import { Field, FormDinamicoType } from "bti_framework/Web-Assets/FormDinamico/config.controller";
import BaseFragment from "bti_framework/Web-Assets/BaseFragment";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";

declare const axios: Axios

//#region Tipos

export type query = {
    id: string,
    get?: string,
    post?: string,
    put?: string,
    delete?: string
}

export type TableConfig = {
    title: string,
    columns: ColumnConfig[]
}

export type AddConfig = {
    title: string
    name?: string
    ignore?: string[]
    defaultForm?: Record<string, any>
    fields: Field[]
}

export type CustomConfig = {
    key: string,
    text: string,
    fragmentName: string
}

export type JSONCadastro = {
    title: string,
    description: string,
    query: query
    table: TableConfig,
    add: AddConfig,
    custom?: CustomConfig[],
}

//#endregion

export default class Default extends BaseFragment<CadastroType> {

    cadastroItemTabela: any
    defaultForm: Record<string, any> = {}
    intervalo: number
    dadosCadastro: JSONCadastro
    tabela: Table
    formFragment: { component: FormDinamicoType['component'] } & FormDinamicoType['methods']

    //#region Navegação da lista lateral

    voltarMaster() {
        let lista = this.getById("lista");
        this.getById<SplitApp>("SplitApp").toMaster(lista.getId(), "", {}, {})
    }

    //#endregion

    //#region Configuração de telas

    // Pega o objeto de criação de cadastro de acordo com o item selecionado
    async configurarCadastros(pagina: string) {
        this.dadosCadastro = this.getParam("registerData")[pagina].data

        this.getModel("telaCadastro").setData(this.dadosCadastro)

        this.renderTable(this.dadosCadastro)
        this.renderAdd(this.dadosCadastro.add)
    }

    async renderTable({ table, query }: JSONCadastro) {
        let tabelaTab = this.getById<IconTabFilter>("tabela")

        tabelaTab.destroyContent()

        clearInterval(this.intervalo)
        this.intervalo = AssetsUtils.pooling(this.loadTableData, 2500, "Ocorreu um erro ao carregar os dados da tabela", this, query.get)

        let tabelaFragment = await AssetsUtils.loadAssets("tabelaPadrao", {
            config: {
                title: table.title
            },
            columns: table.columns,
            data: this.getModel("tabelaCadastro"),
            componentConfig: {
                cellClick: this.onCellClick.bind(this),
                selectionMode: "Single"
            }
        })

        tabelaTab.addContent(tabelaFragment.component)
        this.tabela = tabelaFragment.getTable()

        // Salva a url de consulta na tabela
        this.tabela.data("query", query);
    }

    async loadTableData(query: string) {
        let { data } = await axios.get(query)

        this.getModel("tabelaCadastro").setData(data)
    }

    async renderAdd(subtela: AddConfig) {

        let formTab = this.getById<IconTabFilter>("form")

        formTab.destroyContent()

        this.defaultForm = subtela.defaultForm || {}

        this.getModel("campos").setData({ ...this.defaultForm })

        this.formFragment = await AssetsUtils.loadAssets("FormDinamico", {
            fields: subtela.fields,
            fieldData: this.getModel("campos"),
            config: {
                title: subtela.title
            }
        })

        formTab.addContent(this.formFragment.component)
        await this.formFragment.configFinished()
    }

    //#endregion

    //#region Navegação

    // Chama a função arrumarBotoes de acordo com a tela selecionada
    onTabBarSelect(evento: Event<any>) {
        let parametro = evento.getParameter("key")

        if (parametro === "tabela") this.navToTabela()
        if (parametro === "adicionar") this.navToCadastro()
    }

    // Altera a visiblidade dos botões de acordo com o parametro passado
    buttonChange(parametro: string) {
        let pagina = this.getById<DynamicPageTitle>("pageTitle")
        var actionButtons = pagina.getActions() as Button[]

        actionButtons.forEach((button) => {
            let key = button.data("key")
            if (button.data("disable")) {
                button.setEnabled(false)
            }
            if (key.includes(parametro)) {
                button.setVisible(true)
                return
            }
            button.setVisible(false)
        })

    }

    navToCadastro() {
        this.buttonChange("adicionar");
        this.getById<IconTabBar>("barra").setSelectedKey("adicionar")
        this.formFragment.setTitle(this.dadosCadastro.add.title)
    }

    navToTabela() {
        this.buttonChange("tabela");
        this.getById<IconTabBar>("barra").setSelectedKey("tabela");
        this.tabela.clearSelection()
    }

    navToEdit() {
        this.buttonChange("editar")
        let campos = this.cadastroItemTabela
        let name = this.dadosCadastro.add.name || "Name"
        let titulo = `Editar ${campos[name]}`

        this.formFragment.setTitle(titulo)
        this.getModel("campos").setData(campos);
        this.getById<IconTabBar>("barra").setSelectedKey("adicionar")
    }

    //#endregion

    //#region Interação do usuario

    onCellClick(evento: Event<any>) {
        // Guarda o objeto da linha selecionada e ativa os botoes de editar e deletar
        this.cadastroItemTabela = evento.getParameter("rowBindingContext")?.getObject()
        var actionButtons = this.getById<DynamicPageTitle>("pageTitle").getActions() as Button[]
        actionButtons.forEach(item => {
            if (item.data("key") == "tabela") {
                item.setEnabled(true)
            }
        })
    }

    cancel() {
        this.getModel("campos").setData({ ...this.defaultForm })
        this.navToTabela()
    }

    //#endregion

    //#region Requisições

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

        body = this.fieldClearANDCheckInt(body)

        let query: query = this.tabela.data("query")

        try {
            await axios.post(query.post, body)

            await AssetsUtils.asyncMessageBox("information", "Registro realizado com sucesso!")
            // this.navToTabela()
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

    async delete() {
        // Pega o valor dos campos, verifica os campos obrigatórios e faz a requisição
        let query: query = this.tabela.data("query")
        let id = this.cadastroItemTabela[query.id || "id"]

        let resposta = await AssetsUtils.asyncMessageBox("confirm", `Deseja realmente apagar o registro ${id}?`)

        if (resposta !== "OK") return

        try {
            await axios.delete(query.delete + id)

            await AssetsUtils.asyncMessageBox("information", "Registro deletado com sucesso!")
            this.navToTabela()
            this.getModel("campos").setData({ ...this.defaultForm })
        } catch (error) {
            AssetsUtils.handleError(error, "Erro ao deletar registro")
        }
    }

    // Verifica se os campos obrigatórios estão preenchidos
    checkRequiredFields(body: any) {
        // Passa por cada campo verificando se ele é obrigatório e se ele foi preenchido
        let formulario = this.formFragment.component
        let campos = formulario.getContent() as Control[]
        let camposObrigatorios = campos.filter((item) => {

            let obrigatorio = item.data("required")
            let path = item.data("path")

            if (obrigatorio && !body[path] && item.getVisible()) {
                return item
            }
        });

        // Atribui o estado de erro aos campos obrigatórios não preenchidos
        // e um evento para desatribuir ao ser preenchido
        (camposObrigatorios as InputBase[]).forEach(item => {
            item.attachChange(event => {
                if (event.getParameter("value") !== "") {
                    item.setValueState("None")
                }
            })
            item.setValueState("Error")
        })

        return camposObrigatorios.length !== 0 ? true : false
    }

    // Retira os objetos e transforma string em int quando necessário
    fieldClearANDCheckInt(body: any) {
        if (body.LastChange) {
            delete body.LastChange
        }

        Object.entries(body).forEach(([key, value]) => {
            if (value === undefined || value === null || value === "") {
                delete body[key]
            }
        })

        if (!this.dadosCadastro.add.ignore) {
            return body
        }

        this.dadosCadastro.add.ignore.forEach((key) => {
            delete body[key]
        })

        return body
    }

    validateFields(body: any) {
        return {
            fail: false,
            message: ""
        }
    }

    //#endregion
}