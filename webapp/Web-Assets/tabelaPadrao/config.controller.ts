import Text from "sap/m/Text";
import JSONModel from "sap/ui/model/json/JSONModel";
import Column from "sap/ui/table/Column";
import Table, { $TableSettings } from "sap/ui/table/Table";
import BaseFragment from "../BaseFragment";
import Label from "sap/m/Label";
import Panel from "sap/m/Panel";
import Button, { $ButtonSettings } from "sap/m/Button";
import OverflowToolbar from "sap/m/OverflowToolbar";
import FilterOperator from "sap/ui/model/FilterOperator";
import Control from "sap/ui/core/Control";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";

export type TabelaPadraoType = {
	params: TabelaPadraoParams,
	component: Panel
	methods: TabelaPadraoMethods
}

type TabelaPadraoParams = {
	config: Config
	columns: ColumnConfig[]
	data: JSONModel | any
	componentConfig?: Omit<$TableSettings, 'noData'>
}

type TabelaPadraoMethods = {
	getTable: () => Table
}

export type ColumnConfig = {
	label: string
	path?: string
	formatter?: (param: any) => void
	template?: Control
	widthPoints?: number
	filterOperator?: `${FilterOperator}`
	filterPath?: string | false
	sorterPath?: string | false
}

type Config = {
	title: string,
	noData?: string
	exportCSV?: boolean
	// exportPDF?: boolean
	clearFilter?: boolean
	rowStatusPath?: string
	rowStatusFormatter?: (param: any) => string
	extraButtons?: $ButtonSettings[]
}

export default class TabelaPadrao extends BaseFragment<TabelaPadraoType> {

	Tabela: Table

	public onInit() {
		this.Tabela = this.Component.getContent()[0] as Table

		let config = this.getParam("config")
		let componentConfig = this.getParam("componentConfig")
		let modelData = this.getModel("data")

		let columns = this.getParam("columns")
		let dados = modelData || new JSONModel(this.getParam("data"))

		this.validateColumns(columns)

		this.Tabela.setModel(dados)
		this.Tabela.setModel(new JSONModel(columns), "internalCollumns")

		if (config) this.configTable(config);
		if (componentConfig) this.configComponent(componentConfig);

		this.Tabela.getColumns().forEach(this.configCollumn.bind(this))
	}

	private validateColumns(columns: ColumnConfig[]) {
		if (!columns) {
			throw new Error("A Propriedade obrigatória colunas não existe")
		}

		if (!Array.isArray(columns)) {
			throw new Error("A Propriedade obrigatória colunas não é um Array")
		}

		let validateLabel = columns.find((item) => item.label === undefined)

		if (validateLabel) {
			throw new Error("A Propriedade obrigatória Label não foi encontrada em todos os objetos enviados na propriedade colunas!")
		}
	}

	private configTable(config: Config) {
		this.Tabela.setModel(new JSONModel(config), "config")

		if (config.exportCSV === false) {
			this.getById<Button>("TP-exportCSV").setVisible(false)
		}

		// if (config.exportPDF === false) {
		// 	this.getById<Button>("TP-exportPDF").setVisible(false)
		// }

		if (config.clearFilter === false) {
			this.getById<Button>("TP-clearFilter").setVisible(false)
		}

		if (config.rowStatusPath) {
			this.Tabela.getRowSettingsTemplate().bindProperty("highlight", { path: config.rowStatusPath, formatter: config.rowStatusFormatter })
		}

		if (config.extraButtons) {
			this.configButtons(config.extraButtons)
		}
	}

	private configButtons(buttons: $ButtonSettings[]) {
		let toolBar = this.getById<OverflowToolbar>("toolbar")

		buttons.forEach((item) => {
			toolBar.addContent(new Button(item))
		})
	}

	private configComponent(componentConfig: $TableSettings) {
		let keys = Object.keys(componentConfig) as (keyof $TableSettings)[]

		keys.forEach((key) => {
			if (typeof componentConfig[key] == "function") {
				let func = componentConfig[key] as Function
				return this.Tabela.attachEvent(key, func)
			}

			this.Tabela.setProperty(key, componentConfig[key])
		})
	}

	private async configCollumn(collumn: Column) {

		this.configTextPath(collumn)

		this.configCollumnWidthPoints(collumn)

		this.configCollumnFilter(collumn)
		this.configCollumnSorter(collumn)
	}

	private configTextPath(collumn: Column) {
		// Pega o template da coluna e o caminho dela
		let text = collumn.getTemplate() as Text

		let { path, formatter, template }: ColumnConfig = collumn.data("config")

		if (template) {
			collumn.setTemplate(template)
			return
		}

		// Add o caminho e o model ao template
		text.bindText({ path: path, formatter: formatter })
	}

	private async configCollumnWidthPoints(collumn: Column) {
		let htmlTable = this.Tabela.getDomRef()
		let minWidth = this.getCollumnMinWidth(collumn)
		let { widthPoints } = collumn.data("config")

		if (widthPoints === undefined) {
			collumn.setMinWidth(minWidth)
			return
		}

		if (widthPoints === 0) {
			collumn.setWidth(`${minWidth}px`)
			return
		}

		if (!htmlTable) {
			await AssetsUtils.sleep(100)
			this.configCollumnWidthPoints(collumn)
			return
		}

		let width = htmlTable.clientWidth

		let collumnWidth = width * (widthPoints / 100)
		let finalWidth = collumnWidth > minWidth ? collumnWidth : minWidth

		collumn.setWidth(finalWidth + "px")
	}

	private getCollumnMinWidth(collumn: Column) {
		let label = collumn.getLabel() as Label
		let labelText = label.getText()
		let qtdeCaracteres = labelText.length

		let fontSize = window.getComputedStyle(document.querySelector("body")).getPropertyValue('font-size')
		let fontNumber = fontSize.replace(/[a-z]+/gi, "")

		return parseInt(fontNumber) / 2 * qtdeCaracteres + 30
	}

	private configCollumnFilter(collumn: Column) {
		let config: ColumnConfig = collumn.data("config")

		collumn.setFilterOperator(config.filterOperator)
		collumn.setFilterProperty(config.filterPath || config.path)
	}

	private configCollumnSorter(collumn: Column) {
		let config: ColumnConfig = collumn.data("config")

		collumn.setSortProperty(config.sorterPath || config.path)
	}

	public async onRendering() {
		this.configPanelHeigth()
	}

	private async configPanelHeigth() {
		let panelHTML = this.Component.getDomRef()

		if (!panelHTML) {
			await AssetsUtils.sleep(500)
			this.configPanelHeigth()
			return
		}

		let panelContent = panelHTML.querySelector<HTMLDivElement>(".sapMPanelContent")
		panelContent.style.height = "100%"
	}

	public exportar_CSV() {
		let config: Config = this.getParam("config")
		AssetsUtils.exportCSV(this.Tabela, config.title, "/", (this.Tabela.getModel() as JSONModel))
	}

	public exportar_PDF() {
		// this.exportarPDF(this.Tabela.$().get(0))
	}

	public clearFilters() {
		this.Tabela.getColumns().forEach((item) => {
			this.Tabela.filter(item, "")
		})
		this.Tabela.sort(undefined, undefined, false)
	}

	methods = {
		getTable: () => {
			return this.Tabela
		}
	}
}