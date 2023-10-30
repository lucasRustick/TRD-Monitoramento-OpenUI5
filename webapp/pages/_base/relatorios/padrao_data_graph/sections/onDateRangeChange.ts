import { BaseSection } from "bti_framework/utils/base/BaseSection";
import RelatorioPadraoData from "../config.controller";
import ComboBox from "sap/m/ComboBox";

export class GetDateInputs extends BaseSection<RelatorioPadraoData>{

    public getDateInputs(): { startDate: string, endDate: string } {
        let format = this.instance.getById<ComboBox>("dateRange").getSelectedKey()

        if (!format) {
            return this.instance.getModel("form").getData()
        }

        let formatFunction = this.dateFormats[format]

        if (!formatFunction) {
            throw new RangeError(`O formato ${format} não foi reconhecido!`)
        }

        return formatFunction()
    }

    private readonly dateFormats: Record<string, () => { startDate: string, endDate: string }> = {
        today: () => {
            return {
                startDate: new Date().toLocaleDateString('pt-br'),
                endDate: new Date().toLocaleDateString('pt-br'),
            }
        },
        yesterday: () => {
            return {
                startDate: moment().subtract(1, 'days').toDate().toLocaleDateString('pt-br'),
                endDate: moment().subtract(1, 'days').toDate().toLocaleDateString('pt-br'),
            }
        },
        thisWeek: () => {
            return {
                startDate: moment().startOf("week").toDate().toLocaleDateString('pt-br'),
                endDate: moment().endOf("week").toDate().toLocaleDateString('pt-br'),
            }
        },
        pastWeek: () => {
            return {
                startDate: moment().subtract(1, "week").startOf("week").toDate().toLocaleDateString('pt-br'),
                endDate: moment().subtract(1, "week").endOf("week").toDate().toLocaleDateString('pt-br'),
            }
        },
        thisMonth: () => {
            return {
                startDate: moment().startOf("month").toDate().toLocaleDateString('pt-br'),
                endDate: moment().endOf("month").toDate().toLocaleDateString('pt-br'),
            }
        },
        pastMonth: () => {
            return {
                startDate: moment().subtract(1, 'month').startOf("month").toDate().toLocaleDateString('pt-br'),
                endDate: moment().subtract(1, 'month').endOf("month").toDate().toLocaleDateString('pt-br'),
            }
        },
    }
}