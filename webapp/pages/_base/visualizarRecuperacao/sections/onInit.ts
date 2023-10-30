import { BaseSection } from "bti_framework/utils/base/BaseSection";
import VisualizarRecuperacaoController from "../config.controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";
import DynamicPage from "sap/f/DynamicPage";
import { PasswordRecovery_Connections } from "bti_framework/connections/_base/passwordRecovery_connection";
import Event from "sap/ui/base/Event";
import { $TableCellClickEventParameters } from "sap/ui/table/Table";
import { Database } from "bti_framework/connections/Database";

export class OnInit extends BaseSection<VisualizarRecuperacaoController> {
    createModels(): void {
        this.instance.setModel(new JSONModel(), "table")
    }

    async renderTable() {
        let tabela = await AssetsUtils.loadAssets("tabelaPadrao", {
            config: { title: "Recuperações" },
            columns: [
                { label: "ID", path: "id", widthPoints: 0 },
                { label: "Usuário", path: "Users/0/name" },
                { label: "Data", path: "date", formatter: (date: string) => new Date(date).toLocaleString('pt-br') },
            ],
            data: this.instance.getModel("table"),
            componentConfig: {
                selectionBehavior: "RowOnly",
                selectionMode: "Single",
                cellClick: this.onCellClick.bind(this),
            }
        })

        this.instance.getById<DynamicPage>("page").setContent(tabela.component)
    }

    onCellClick(event: Event<$TableCellClickEventParameters>) {
        let data = event.getParameter("rowBindingContext").getObject()

        this.instance.selected = data as Database.PasswordRecoverys
    }

    async loadData() {
        let data = await PasswordRecovery_Connections.getAllPending()
        this.instance.getModel("table").setData(data)
    }
}