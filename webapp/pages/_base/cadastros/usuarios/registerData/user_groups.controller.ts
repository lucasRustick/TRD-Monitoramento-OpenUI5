import { Cadastro } from "bti_framework/Web-Assets/modulos/Cadastros/config.controller"
import ComboBox from "sap/m/ComboBox"
import Input from "sap/m/Input"
import Item from "sap/ui/core/Item"

export const user_groups: Cadastro = {
    data: {
        title: "Cadastro de Grupos de Usuários",
        description: "Aqui você pode configurar os Grupos de Usuários cadastrados.",
        query: {
            id: "IdUserGroup",
            get: "/Base/user_groups/all/active/register",
            post: "/Base/user_groups",
            put: "/Base/user_groups/IdUserGroup=",
            delete: "/Base/user_groups/IdUserGroup="
        },
        table: {
            title: "Grupos de usuários",
            columns: [
                { label: "ID", path: "IdUserGroup", widthPoints: 0 },
                { label: "Nome", path: "Name" },
                { label: "Tipo de Grupo", path: "UserGroupTypes/0/Name" },
            ]
        },
        add: {
            title: "Novo Grupo de Usuário",
            name: "Name",
            ignore: ["IdUserGroup", "UserGroupTypes"],
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
                },
                {
                    id: "IdUserGroupType",
                    component: ComboBox,
                    label: "Tipo de Grupo",
                    props: {
                        width: "30rem",
                        selectedKey: "{campos>/IdUserGroupType}"
                    },
                    customData: {
                        required: true,
                        path: "IdUserGroupType"
                    },
                    items: {
                        query: "/Base/user_groups/user_group_types",
                        bindingInfo: {
                            template: new Item({ text: "{Name}", key: "{IdUserGroupType}" })
                        }
                    }
                }
            ]
        },
        custom: []
    }
}