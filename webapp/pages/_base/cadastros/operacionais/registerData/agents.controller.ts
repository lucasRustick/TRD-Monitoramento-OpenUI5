import { Cadastro } from "bti_framework/Web-Assets/modulos/Cadastros/config.controller"
import Input from "sap/m/Input"

export const agents: Cadastro = {
    data: {
        title: "Cadastro de Agentes",
        description: "Aqui você pode configurar os Agentes cadastrados.",
        query: {
            id: "IdAgents",
            get: "/Base/agents/all/active",
            post: "/Base/agents",
            put: "/Base/agents/IdAgents=",
            delete: "/Base/agents/IdAgents=",
        },
        table: {
            title: "Empresas",
            columns: [
                { label: "ID", path: "IdAgents", widthPoints: 0 },
                { label: "Nome", path: "Name" },
            ]
        },
        add: {
            title: "Nova Empresa",
            name: "Name",
            ignore: ["IdAgents"],
            fields: [
                {
                    id: "Name",
                    component: Input,
                    label: "Nome",
                    props: {
                        width: "30rem",
                        value: "{campos>/Name}"
                    },
                    customData: {
                        required: true,
                        path: "Name"
                    }
                }
            ]
        },
        custom: []
    }
}