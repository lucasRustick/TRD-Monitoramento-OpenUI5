import BaseController from "bti_framework/utils/base/BaseController";
import { OnInit } from "./sections/onInit";
import { LoadMonitorableData } from "./sections/loadMonitorableData";


export default class Monitoramento extends BaseController {

    secOnInit = new OnInit(this)
    secLoadMonitorableData = new LoadMonitorableData(this)

    public onInit(): void {
        this.secOnInit.onInit()
    }

    public loadTableData() {
        this.secLoadMonitorableData.loadTableData()
    }
    
}
