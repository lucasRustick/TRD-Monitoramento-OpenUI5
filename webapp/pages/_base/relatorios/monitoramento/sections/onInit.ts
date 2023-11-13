import { BaseSection } from "bti_framework/utils/base/BaseSection";
import Monitoramento from "../config.controller";
import JSONModel from "sap/ui/model/json/JSONModel";


export class OnInit extends BaseSection<Monitoramento>{
    onInit() {
        this.initModels()
    }

    private initModels(){
        this.instance.setModel(new JSONModel(), "Monitoramento")
        this.instance.setModel(new JSONModel(), "campos")
    }
}