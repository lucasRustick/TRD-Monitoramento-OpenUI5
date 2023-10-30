import { BaseSection } from "bti_framework/utils/base/BaseSection";
import RelatorioPadraoData from "../config.controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";
import VBox from "sap/m/VBox";

export class OnInit extends BaseSection<RelatorioPadraoData>{

    onInit() {
        this.initModels()
        this.renderTable()
        this.renderGraph()
    }

    private initModels() {
        this.instance.setModel(new JSONModel(), "tableData")
        this.instance.setModel(new JSONModel(), "dialogForm")
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
            data: this.instance.getModel("tableData"),
        })

        table.getTable().setVisibleRowCountMode("Fixed")
        table.getTable().setVisibleRowCount(10)

        this.instance.getById<VBox>("vbox").addItem(table.component)
    }

    private async renderGraph() {
        let canvas = await this.getCanvas()

        this.instance.chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: ["1", "2", "3", "4", "5"],
                datasets: [
                    {
                        label: "Parametro 1",
                        data: [10, 20, 30, 40, 35],
                        backgroundColor: "rgb(187, 0, 0)",
                        borderColor: "rgb(187, 0, 0)",
                    }
                ]
            }
        })
    }

    private getCanvas() {
        return new Promise<HTMLCanvasElement>((resolve) => {
            let canvasControl = this.instance.byId("canvas")

            let interval = setInterval(() => {
                let canvasDom = canvasControl.getDomRef() as HTMLCanvasElement

                if (canvasDom) {
                    clearInterval(interval)
                    resolve(canvasDom)
                    return
                }
            })
        })
    }
}