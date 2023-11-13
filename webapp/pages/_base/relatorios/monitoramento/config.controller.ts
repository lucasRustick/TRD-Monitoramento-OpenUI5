import BaseController from "bti_framework/utils/base/BaseController";
import { OnInit } from "./sections/onInit";
import { LoadMonitorableData } from "./sections/loadMonitorableData";
import Dialog from "sap/m/Dialog";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import Label from "sap/m/Label";
import Button from "sap/m/Button";
import JSONModel from "sap/ui/model/json/JSONModel";
import Input from "sap/m/Input";
import Icon from "sap/ui/core/Icon";
import HBox from "sap/m/HBox";
import Grid from "sap/ui/layout/Grid";


export default class Monitoramento extends BaseController {

    secOnInit = new OnInit(this)
    secLoadMonitorableData = new LoadMonitorableData(this)

    public onInit(): void {
        this.secOnInit.onInit()
        this.loadTableData()
    }

    public loadTableData() {
        this.secLoadMonitorableData.loadTableData()
    }

    abrirLegenda() {
        let dialog = new Dialog({
            title: "Tela de Legendas",
            draggable: true,
            content: [
                new SimpleForm({
                    content: [
                        new Grid({
                            defaultSpan: "L6 M6 S6",
                            width: "20rem",
                            content: [
                                new Label({
                                    text: "Tarefa em andamento"
                                }),
                                new Icon({
                                    src: "sap-icon://color-fill",
                                    color: "Positive"
                                }),
                                new Label({
                                    text: "Tarefa com Falha"
                                }),
                                new Icon({
                                    src: "sap-icon://color-fill",
                                    color: "Negative"
                                }),
                                new Label({
                                    text: "Tarefa com Problema"
                                }),
                                new Icon({
                                    src: "sap-icon://color-fill",
                                    color: "Critical"
                                }),
                                new Label({
                                    text: "Tarefa Pausada"
                                }),
                                new Icon({
                                    src: "sap-icon://color-fill",
                                    color: "NonInteractive"
                                }),
                            ]
                        })
                    ]
                })
            ],
            beginButton: new Button({
                type: "Emphasized",
                text: "Fechar",
                press: () => {
                    dialog.close()
                }
            })
        })

        dialog.open()
    }
    
}
