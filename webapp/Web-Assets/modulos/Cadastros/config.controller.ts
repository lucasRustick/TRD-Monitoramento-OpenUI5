import Event from "sap/ui/base/Event";
import JSONModel from "sap/ui/model/json/JSONModel";
import Padrao, { JSONCadastro } from "./default.controller";
import IconTabBar from "sap/m/IconTabBar";
import Controller from "sap/ui/core/mvc/Controller";
import StandardListItem from "sap/m/StandardListItem";
import List from "sap/m/List";
import SplitApp from "sap/m/SplitApp";

export type CadastroType = {
    params: CadastroParams
    component: SplitApp
}

type CadastroParams = {
    config?: {
        addButtonTitle?: string
        editButtonTitle?: string
        deleteButtonTitle?: string
        updateButtonTitle?: string
        finishButtonTitle?: string
        cancelButtonTitle?: string
        tableTabTitle?: string
        addTabTitle?: string
    }
    listaCadastro: ItemLista[]
    registerData: Record<string, Cadastro>
}

type ItemLista = {
    titulo: string
    page: string
}

export type Cadastro = {
    data: JSONCadastro
    childPath?: string
}

export default class Cadastros extends Padrao {

    defaultParams: Partial<CadastroParams> = {
        config: {
            addButtonTitle: "Adicionar",
            editButtonTitle: "Editar",
            deleteButtonTitle: "Deletar",
            updateButtonTitle: "Atualizar",
            finishButtonTitle: "Finalizar",
            cancelButtonTitle: "Cancelar",
            tableTabTitle: "Dados",
            addTabTitle: "Adicionar",
        }
    }

    async onInit() {
        this.initModels()
        this.init(this.getFirstPage())
    }

    getFirstPage() {
        let [first] = this.getModel("listaCadastro").getData()
        return first.page
    }

    initModels() {
        // Cria o model de configuração do modulo
        this.setModel(new JSONModel(this.getParam("config")), "config")

        // Cria o model para a lista de cadastros e para os campos
        this.setModel(new JSONModel(this.getParam("listaCadastro")), "listaCadastro")

        // Cria models para MVC
        this.setModel(new JSONModel(), "telaCadastro")
        this.setModel(new JSONModel(), "tabelaCadastro")
        this.setModel(new JSONModel(), "campos")
    }

    navCadastros(evento: Event<any>) {
        let item = evento.getParameter("listItem") as StandardListItem
        let page = item.data("page")

        this.init(page)
    }

    public async init(page: string) {
        let controlador = await this.pegarFilho(page)

        let funcoes = Object.getPrototypeOf(controlador)

        let ignorar = ["constructor", "getMetadata"]
        Object.getOwnPropertyNames(Object.getPrototypeOf(controlador)).forEach((key) => {
            if (!ignorar.includes(key)) {
                this[key as keyof typeof this] = funcoes[key]
            }
        });

        this.getById<IconTabBar>("barra").setSelectedKey("tabela")

        this.buttonChange("tabela")
        this.setListSelection(page)

        // Vincula a função ao evento de troca de tela
        this.configurarCadastros(page);
    }

    private async pegarFilho(page: string) {
        let { childPath } = this.getParam("registerData")[page]

        if (childPath) {
            return await Controller.create({
                name: childPath
            })
        }
        return await Controller.create({
            name: `bti_framework.Web-Assets.modulos.Cadastros.default`
        })
    }

    private setListSelection(page: string) {
        let list = this.getById<List>("lista")
        list.getItems().forEach((item) => {
            if (item.data("page") === page) {
                list.setSelectedItem(item)
            }
        })
    }

    public voltarMaster_handler = () => this.voltarMaster()

    public navToCadastro_handler = () => this.navToCadastro()

    public navToEdit_handler = () => this.navToEdit()

    public onCellClick_handler = (evento: Event) => this.onCellClick(evento)

    public cancelarOperacao_handler = () => this.cancel()

    public create_handler = () => this.create()

    public update_handler = () => this.update()

    public delete_handler = () => this.delete()
}
