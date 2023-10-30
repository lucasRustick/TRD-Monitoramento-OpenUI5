import BaseController from "bti_framework/utils/base/BaseController";
import { OnInit } from "./sections/onInit";
import { $ComboBoxSelectionChangeEventParameters } from "sap/m/ComboBox";
import Event from "sap/ui/base/Event";
import DatePicker from "sap/m/DatePicker";
import { LoadTableData } from "./sections/loadTableData";

export default class RelatorioPadraoData extends BaseController {

    secOnInit = new OnInit(this)
    secLoadTableData = new LoadTableData(this)

    public onInit(): void {
        this.secOnInit.onInit()
    }

    public loadTableData() {
        this.secLoadTableData.loadTableData()
    }

    public saveFilter() {
        localStorage.setItem("relatorio_data", JSON.stringify(this.getModel("form").getData()))
    }

    public validateDate(type: "start" | "end") {
        let formData: FormData = this.getModel("form").getData()

        if (type === "start" && formData.endDate) {
            return
        }

        if (type === "end" && formData.startDate) {
            return
        }

        if (type === "start") {
            let dateDiff = moment(formData.startDate, "DD/MM/YYYY").diff(moment(), "days")

            if (dateDiff > 0) {
                return
            }

            this.getById<DatePicker>("endDate").setValue(new Date().toLocaleDateString('pt-br'))
        }

        if (type === "end") {
            let dateDiff = moment(formData.endDate, "DD/MM/YYYY").diff(moment(), "days")

            if (dateDiff < 0) {
                return
            }

            this.getById<DatePicker>("startDate").setValue(new Date().toLocaleDateString('pt-br'))
        }
    }

    public onDateRangeChange(event: Event<$ComboBoxSelectionChangeEventParameters>) {
        let item = event.getParameter("selectedItem")

        let bool = Boolean(item?.getKey())

        this.getById<DatePicker>("startDate").setEnabled(!bool)
        this.getById<DatePicker>("endDate").setEnabled(!bool)
    }
}

export interface FormData {
    startDate?: string
    endDate?: string
    dataRange?: string
}