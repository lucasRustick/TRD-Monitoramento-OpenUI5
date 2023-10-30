type menu_lateral = {
    name: string
    icon?: string
    url?: string
    IdUserGroupType: number
    items?: menu_lateral[]
}

export const menu_lateral: menu_lateral[] = [
    {
        name: "Menu inicial",
        icon: "sap-icon://home",
        url: "#/menu",
        IdUserGroupType: 3
    },
    {
        name: "Monitoramento",
        icon: "sap-icon://sys-monitor",
        IdUserGroupType: 2,
        items: [
            // {
            //     name: "Padrão data",
            //     url: "#/relatorios/padrao_data",
            //     IdUserGroupType: 2
            // },
            // {
            //     name: "Padrão data e grafico",
            //     url: "#/relatorios/padrao_data_graph",
            //     IdUserGroupType: 2
            // },
            {
                name: "Monitoramento",
                url: "#/relatorios/monitoramento",
                IdUserGroupType: 2
            }
        ]
    },
    {
        name: "Cadastros",
        icon: "sap-icon://add-document",
        IdUserGroupType: 2,
        items: [
            {
                name: "Cadastros Operacionais",
                icon: "sap-icon://add-activity",
                url: "#/cadastros/operacionais",
                IdUserGroupType: 2
            },
            {
                name: "Cadastros de Usuários",
                icon: "sap-icon://customer",
                url: "#/cadastros/usuarios",
                IdUserGroupType: 2
            }
        ]
    },
    {
        name: "Gestão de senhas",
        icon: "sap-icon://private",
        url: "#/visualizarRecuperacao",
        IdUserGroupType: 2
    },
]