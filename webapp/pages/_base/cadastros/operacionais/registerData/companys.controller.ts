import { Cadastro } from "bti_framework/Web-Assets/modulos/Cadastros/config.controller"
import Input from "sap/m/Input"

export const companys: Cadastro = {
    data: {
        title: "Cadastro de Empresas",
        description: "Aqui você pode configurar as Empresas cadastrados.",
        query: {
            id: "IdCompany",
            get: "/Base/companys/all/active",
            post: "/Base/companys",
            put: "/Base/companys/IdCompany=",
            delete: "/Base/companys/IdCompany=",
        },
        table: {
            title: "Empresas",
            columns: [
                { label: "ID", path: "IdCompany", widthPoints: 0 },
                { label: "Nome", path: "Name" },
            ]
        },
        add: {
            title: "Nova Empresa",
            name: "Name",
            ignore: ["IdCompany"],
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