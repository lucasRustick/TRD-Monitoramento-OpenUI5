import { BaseSection } from "bti_framework/utils/base/BaseSection";
import Monitoramento from "../config.controller";
import { Database } from "bti_framework/connections/Database";
import MessageBox from "sap/m/MessageBox";


export class LoadMonitorableData extends BaseSection<Monitoramento>{
    async loadTableData() {
        let campos = this.instance.getModel("campos").getData()
        console.log(campos)

        if (!campos.Unidade) return

        if(campos.Entidade && campos.TarefaAtribuida){
            MessageBox.show("Por favor utilize apenas um dos campos como pesquisa!")
            return
        }

        let { data } = await axios.post<Database.Agents>("/Base/Agents/monitoring", { agent: campos.Entidade, task: campos.TarefaAtribuida})
        console.log(data)

        let formData = this.formData(data)

        console.log(formData)
        this.instance.getModel("Monitoramento").setData(formData)
    }

    formData(data: any) {
        let group: any = data.reduce((acc: any, current: any) => {
            let found = acc.find((item: { IdAgents: any; }) => item.IdAgents === current.IdAgents);
            if (!found) {
                acc.push({
                    IdAgents: current.IdAgents,
                    Name: current.AgentName,
                    tasks: [{
                        key: current.Name,
                        IdTask: current.IdTask,
                        IdAgent: current.IdAgent,
                        Type: current.Type,
                        Status: this.formStatus(current.Status)
                    }]
                });
            } else {
                found.tasks.push({
                    key: current.Name,
                    IdTask: current.IdTask,
                    IdAgent: current.IdAgent,
                    Type: current.Type,
                    Status: this.formStatus(current.Status)
                });
            }
            return acc;
        }, []);

        return group
    }

    formStatus(statusInt: number) {
        if (statusInt === 0) return "None"
        if (statusInt === 1) return "Success"
        if (statusInt === 2) return "Warning"
        if (statusInt === 3) return "Error"
    }
}