import { Cadastro } from "bti_framework/Web-Assets/modulos/Cadastros/config.controller"
import Input from "sap/m/Input"

export const plants: Cadastro = {
    data: {
        title: "Cadastro de Plantas",
        description: "Aqui você pode configurar as plantas cadastrados.",
        query: {
            id: "IdPlant",
            get: "/Base/plants/all/active",
            post: "/Base/plants",
            put: "/Base/plants/IdPlant=",
            delete: "/Base/plants/IdPlant="
        },
        table: {
            title: "Plantas",
            columns: [
                { label: "ID", path: "IdPlant", widthPoints: 0 },
                { label: "Nome", path: "Name" },
            ]
        },
        add: {
            title: "Nova planta",
            name: "Name",
            ignore: ["IdPlant"],
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