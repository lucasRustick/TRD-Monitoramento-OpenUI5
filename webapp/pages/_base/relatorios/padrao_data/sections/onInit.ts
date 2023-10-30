import { BaseSection } from "bti_framework/utils/base/BaseSection";
import RelatorioPadraoData from "../config.controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";
import DynamicPage from "sap/f/DynamicPage";

export class OnInit extends BaseSection<RelatorioPadraoData>{

    onInit() {
        this.initModels()
        this.renderTable()
    }

    private initModels() {
        this.instance.setModel(new JSONModel(), "tableData")
        this.instance.setModel(new JSONModel(), "form")
    }

    private async renderTable() {
        let table = await AssetsUtils.loadAssets("tabelaPadrao", {
            config: {
                title: "Titulo tabela"
            },
            columns: [
                { label: "Coluna 1", path: "column1" },
                { label: "Coluna 2", path: "column2" },
                { label: "Coluna 3", path: "column3" },
            ],
            data: this.instance.getModel("tableData")
        })

        this.instance.getById<DynamicPage>("page").setContent(table.component)
    }
}