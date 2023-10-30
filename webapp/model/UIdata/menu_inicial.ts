type menu_inicial = {
    icone: string
    titulo: string
    descricao: string
    IdUserGroupType: number
    key: string
}

export const menu_inicial: Array<{ data: menu_inicial[] }> = [
    {
        data: [
            {
                icone: "sap-icon://sys-monitor",
                titulo: "Monitoramento",
                descricao: "Aqui você pode acessar o monitoramento",
                IdUserGroupType: 3,
                key: "#/relatorios/monitoramento"
            },
            {
                icone: "sap-icon://add-document",
                titulo: "Cadastro Operacionais",
                descricao: "Aqui você pode acessar o cadastro operacionais",
                IdUserGroupType: 2,
                key: "#/cadastros/operacionais"
            },
        ]
    },
]