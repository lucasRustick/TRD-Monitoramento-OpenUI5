import { BaseSection } from "bti_framework/utils/base/BaseSection";
import RelatorioPadraoData, { FormData } from "../config.controller";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";
import MessageBox from "sap/m/MessageBox";
import { GetDateInputs } from "./onDateRangeChange";

export class LoadTableData extends BaseSection<RelatorioPadraoData>{

    secGetDateInputs = new GetDateInputs(this.instance)

    public loadTableData() {
        let formData: FormData = this.instance.getModel("form").getData()

        try {
            this.instance.busy = true

            if (this.isFormValid(formData) === false) {
                return
            }

            let { startDate, endDate } = this.secGetDateInputs.getDateInputs()

            console.log(formData)

            alert(`Passou validações: ${startDate} - ${endDate}`)

        } catch (error) {
            AssetsUtils.handleError(error, "Ocorreu um erro ao carregar o relatório de data!")
        } finally {
            this.instance.busy = false
        }
    }

    private isFormValid(formData: FormData) {

        if (this.isFormFilled(formData) === false) {
            MessageBox.warning("Preencha os campos de data ou o combo de intervalo para continuar!")
            return false
        }

        if (formData.dataRange) {
            return true
        }

        if (moment(formData.startDate, "DD/MM/YYYY").diff(moment(formData.endDate, "DD/MM/YYYY"), "days") > 0) {
            MessageBox.warning("A data inicial não pode ser maior do que a data final!")
            return false
        }

        return true
    }

    private isFormFilled(formData: FormData) {
        if (formData.dataRange) {
            return true
        }

        if (formData.startDate && formData.endDate) {
            return true
        }

        return false
    }
}