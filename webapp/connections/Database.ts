export namespace Database {

    export interface Users {
        IdUser: number
        IdCompany: number
        IdAddress: number
        Name: string
        Login: string
        TagNumber: string
        Mail: string
        Pass: string
        Token: string
        JobDescription: string
        Phone: string
        ProjectEnrolment: string
        DecisionAccount: 1 | 0
        LastLogin: string
        IdUserChange: number
        LastChange: string
        Active: 1 | 0
    }

    export interface UserGroupTypes {
        IdUserGroupType: number
        Name: string
        Active: 1 | 0
    }

    export interface Agents {
        reduce(arg0: (acc: any, current: any) => any, arg1: undefined[]): unknown
        IdAgents: number
        AgentName: string
        Active: 1 | 0
    }

    export interface UserGroups {
        IdUserGroup: number
        IdUserGroupType: number
        IdCompany: number
        Name: string
        Active: 1 | 0
    }

    export interface UsersxUserGroups {
        IdUsersxUserGroup: number
        IdUser: number
        IdUserGroup: number
        Active: 1 | 0
    }

    export interface Accesses {
        IdAccess: number
        IdUser: number
        IdCompany: number
        IdPath: number
        Active: 1 | 0
    }

    export interface Companys {
        IdCompany: number
        Name: string
        Alias: string
        CNPJ: string
        URL: string
        IdAddress: number
        TotalUser: number
        TotalResource: number
        DueDate: string
        GatewayUser: string
        GatewayPass: string
        IdOwnerCompany: number
        IdUser: number
        LastChange: string
        Partner: 1 | 0
        Active: 1 | 0
    }

    export interface Addresses {
        IdAddress: number
        Street: string
        Number: number
        Comp: string
        Disctric: string
        City: string
        State: string
        Country: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface Resources {
        IdResource: number
        IdCompany: number
        IdDevice: number
        IdResourceGroup: number
        IdResourceProductionOrderType: number
        Name: string
        ERPCode: string
        IdResourceType: number
        HourlyCost: number
        DataImputType: number
        ProductionOrderImput: number
        MultipleProductionOrder: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface ResourceTypes {
        IdResourceType: number
        Name: string
        Active: 1 | 0
    }

    export interface CommunicationTypes {
        IdCommunicationType: number
        Name: string
        Active: 1 | 0
    }

    export interface DeviceParams {
        IdDeviceParam: number
        IdResource: number
        IdDevice: number
        IdParamType: number
        JSONName: string
        BusinessName: string
        DataType: number
        Color: string
        Icon: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface Paths {
        IdPath: number
        PathType: number
        Name: string
        URL: string
        InternalCode: number
        Icon: string
        Active: 1 | 0
    }

    export interface Tiles {
        IdTile: number
        IdResource: number
        IdTileConfigType: number
        Position: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface TileConfigTypes {
        IdTileConfigType: number
        Name: string
        Active: 1 | 0
    }

    export interface TileConfigLabels {
        IdTileConfigLabel: number
        IdTileConfigType: number
        Description: string
        Position: number
        Active: 1 | 0
    }

    export interface TileConfigParams {
        IdTileConfigParam: number
        IdTileConfigType: number
        Description: string
        Position: number
        Active: 1 | 0
    }

    export interface Logs {
        IdLog: number
        EventDate: string
        IdUser: number
        IdCompany: number
        Table: string
        Key: string
        Field: string
        Description: string
        Active: 1 | 0
    }

    export interface Devices {
        IdDevice: number
        IdCompany: number
        DeviceID: string
        DeviceIP: string
        DevicePort: number
        IdCommunicationType: number
        LastDataReceived: string
        Active: 1 | 0
    }

    export interface CollectedData {
        IdCollectedDat: number
        IdParam: number
        IdDevice: number
        IdResource: number
        IdCompany: number
        IdPack: number
        EventDate: string
        ValueInt: number
        ValueChar: string
        ValueDouble: number
        Active: 1 | 0
    }

    export interface ParamTypes {
        IdParamType: number
        Name: string
        Active: 1 | 0
    }

    export interface ParamsDictionary {
        IdParamsDictionar: number
        IdParam: number
        CollectedData: number
        Presentation: string
        Active: 1 | 0
    }

    export interface TileLabels {
        IdTileLabel: number
        IdTile: number
        IdTileConfigLabel: number
        Value: string
        Active: 1 | 0
    }

    export interface TileParams {
        IdTileParam: number
        IdTile: number
        IdTileConfigParam: number
        IdParam: number
        Active: 1 | 0
    }

    export interface SystemParams {
        IdSystemParam: number
        IdCompany: number
        Description: string
        Type: number
        ValueType: number
        ValueInt: number
        ValueChar: string
        ValueDouble: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface TagRegisters {
        IdTagRegister: number
        IdCompany: number
        IdUserGroup: number
        IdUser: number
        Name: string
        Type: number
        Active: 1 | 0
    }

    export interface TagRelations {
        IdTagRelation: number
        IdDevice: number
        IdResource: number
        IdTile: number
        IdParam: number
        Active: 1 | 0
    }

    export interface ParamFormats {
        IdParamFormat: number
        IdParam: number
        ValueType: number
        ValueBegin: string
        ValueEnd: string
        Color: string
        Icon: string
        Active: 1 | 0
    }

    export interface Printers {
        IdPrinter: number
        IdCompany: number
        Name: string
        IdLang: number
        IP: string
        ERPCode: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface PrinterLanguages {
        IdPrinterLanguage: number
        Name: string
        Active: 1 | 0
    }

    export interface Plants {
        IdPlant: number
        IdCompany: number
        Name: string
        ERPCode: string
        IdAddress: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface Warehouses {
        IdWarehouse: number
        IdCompany: number
        IdPlant: number
        Name: string
        ERPCode: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface StockAdressGroups {
        IdStockAdressGroup: number
        IdWarehouse: number
        Name: string
        ERPCode: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface StockAdresses {
        IdStockAdresse: number
        IdStockAdressGroup: number
        Name: string
        ERPCode: string
        Full: 1 | 0
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface Batches {
        IdBatch: number
        IdItem: number
        IdProductionOrderItem: number
        ERPCode: string
        Unit: string
        Quantity: number
        Quality: number
        DataCreate: string
        Status: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface MovingBatches {
        IdMovingBatch: number
        IdBatch: number
        IdHandlingUnit: number
        ERPCode: string
        Quantity: number
        DataCreate: string
        Status: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface HandlingUnits {
        IdHandlingUnit: number
        IdStockAdress: number
        ERPCode: string
        DateCreate: string
        Weight: number
        Status: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface HUMovingBatchesLogs {
        IdHUMobvingBatchesLog: number
        IdMovingBatch: number
        DateEvent: string
        MovingType: number
        IdUser: number
        Active: 1 | 0
    }

    export interface Transports {
        IdTransport: number
        IdTransportPartner: number
        IdAddress: number
        Plate: string
        DateEvent: string
        LoadWheigt: number
        Status: number
        DestinationType: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface TransportPartners {
        IdTransportPartner: number
        Name: string
        Active: 1 | 0
    }

    export interface TransportLoads {
        IdTransportLoad: number
        IdTransport: number
        IdHandlingUnit: number
        IdUser: number
        DateEvent: string
        Active: 1 | 0
    }

    export interface ProductionOrders {
        IdProductionOrder: number
        ERPCode: string
        Sequence: number
        ExecDateStart: string
        ExecDateEnd: string
        TotalExecTime: number
        LiquidExecTime: number
        PlanningDateBegin: string
        PlanningDateEnd: string
        TotalPlanningTime: number
        CreateDate: string
        CreateIdUser: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface ProductionOrdersItems {
        IdProductionOrdersItem: number
        IdProductionOrder: number
        IdItem: number
        IdResourceExec: number
        IdResourcePlanning: number
        ERPCode: string
        ERPIdRoute: string
        Sequence: number
        Unit: string
        Quantity: number
        AskQuantity: number
        ExecIdUser: number
        ExecDateStart: string
        ExecDateEnd: string
        TotalExecTime: number
        LiquidExecTime: number
        CreateDate: string
        CicleQuantity: number
        TotalPlanningTime: number
        PlanningDateBegin: string
        PlanningDateEnd: string
        StandardCicleTime: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface Items {
        IdItem: number
        ERPCode: string
        Name: string
        Weight: number
        Time: number
        StandardCicleTime: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface StopReasons {
        IdStopReason: number
        Name: string
        HaveDetailReason: number
        Scheduled: number
        DiscountLiquidTime: number
        Color: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface StopReasonDetails {
        IdStopReasonDetail: number
        IdStopReason: number
        Name: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface ResourceStops {
        IdResourceStop: number
        IdResource: number
        IdStopReason: number
        IdStopReasonDetail: number
        IdProductionOrder: number
        DateEventBegin: string
        DateEventEnd: string
        TotalEventTime: number
        DateRegister: string
        Description: string
        IdUser: number
        Active: 1 | 0
    }

    export interface ResourceGroups {
        IdResourceGroup: number
        IdResourceGroupFather: number
        IdCompany: number
        IdPlant: number
        IdWarehouse: number
        Name: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface ResourceProductionOrderTypes {
        IdResourceProductionOrderType: number
        Name: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface ResourceIndicators {
        IdResourceIndicator: number
        IdResource: number
        OEE: number
        Disponibility: number
        Performance: number
        Quality: number
        OEEGoal: number
        DisponibilityGoal: number
        PerformanceGoal: number
        QualityGoal: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface CTGSI_Destinations {
        IdCTGSI_Destination: number
        DestionationName: string
        ERPCode: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface CTGSI_AdressDestinations {
        IdCTGSI_AdressDestination: number
        IdStockAdress: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface CTGSI_Requisitions {
        IdCTGSI_Requisition: number
        IdItem: number
        ERPCodeItem: string
        AskQuantity: number
        SupplyQuantity: number
        Priority: number
        DateCreate: string
        DateForeseen: string
        DateSupply: string
        CustomerCode: string
        CustomerName: string
        SalesOrder: string
        ItemFrom: string
        ItemTo: string
        Status: number
        IdPriorRequisition: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface CTGSI_MovingBatchRequisitions {
        IdCTGSI_MovingBatchRequisition: number
        IdMovingBatch: number
        Status: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface CTGSI_HUStatus {
        IdCTGSI_HUStatu: number
        Priority: number
        DateCreateRequisition: string
        Active: 1 | 0
    }

    export interface CTGSI_TransportDestinations {
        IdCTGSI_TransportDestination: number
        IdDestination: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface ResourceTimeLines {
        IdResourceTimeLine: number
        IdResource: number
        IdProductionOrder: number
        IdResourceStop: number
        ResourceStatus: number
        DataEvent: string
        TotalTimeLastEvent: number
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface Shifts {
        IdShift: number
        Description: string
        Shiftbegin: string
        ShiftEnd: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface Calendars {
        IdCalendar: number
        IdShift: number
        DateStart: string
        DateEnd: string
        IdUser: number
        LastChange: string
        Active: 1 | 0
    }

    export interface PasswordRecoverys {
        IdPasswordRecovery: number
        IdUser: number
        Date: string
        Approved: 1 | 0
        Active: 1 | 0
    }

}

export interface RetornoMySQL {
    constructor: {
        name: 'ResultSetHeader';
    };
    affectedRows: number;
    fieldCount: number;
    info: string;
    insertId: number;
    serverStatus: number;
    warningStatus: number;
    changedRows?: number;
}

export type BindTableReturn<
    Res extends Record<string, any>,
    R extends Record<string, any>,
    T extends string
> = Array<R & { [K in T]: Res[] }>

export type BindTableReturnSingle<
    Res extends Record<string, any>,
    R extends Record<string, any>,
    T extends string
> = R & { [K in T]: Res[] }