import Control from "sap/ui/core/Control";
import JSONModel from "sap/ui/model/json/JSONModel";
import Model from "sap/ui/model/Model";
import UI5Element from "sap/ui/core/Element";
import BTIController from "./BTIController";
import View from "sap/ui/core/mvc/View";

export type FragmentReturn<T extends BaseFragmentType> = BaseFragmentReturn<T> & { component: T['component'] } & T['methods']

type BaseFragmentReturn<T extends BaseFragmentType> = {
	getById<Component extends UI5Element>(id: string): Component
	getParam<Key extends keyof T['params']>(paramName: Key): T['params'][Key]
}

type BaseFragmentType = {
	params: Record<string, any>
	methods?: Record<string, any>
	component: Control
}

/** Classe basica com funcionalidades para todos os Fragments
 * Recebe um tipo que é a extensão do tipo BaseFragmentType
 */
export default abstract class BaseFragment<FragmentType extends BaseFragmentType> extends BTIController {

	public Component: FragmentType['component']
	public methods: FragmentType['methods'] = {}
	public defaultParams: Partial<FragmentType['params']> = {}

	private rendered: boolean = false
	private firstRendered: boolean = false
	private ComponentParams: FragmentType['params']

	public onInit_handler(component: FragmentType['component'], params: FragmentType['params']) {
		this.Component = component
		this.configParams(params)
		this.onInit()
		this.starRenderingListerners()
	}

	private configParams(params: FragmentType['params']) {
		let defaultPaths = this.getObjectPaths(this.defaultParams)

		Object.keys(params).forEach((key) => {
			if (params[key] instanceof JSONModel) {
				this.setModel(params[key], key)
			}
		})

		this.ComponentParams = defaultPaths.reduce((old, path) => {
			if (this.getValueByPath(path, old) !== undefined) {
				return old
			}
			return this.setValueByPath(path, old, this.getValueByPath(path, this.defaultParams))
		}, params)
	}

	private getObjectPaths(obj: Record<string, any>, anterior: string[] = [], prefix = ""): string[] {
		return Object.keys(obj).reduce((old, item) => {
			let key = prefix ? `${prefix}.${item}` : item

			if (typeof obj[item] === "object") {
				old.push(key)
				return this.getObjectPaths(obj[item], old, key)
			}

			old.push(key)
			return old
		}, anterior)
	}

	private getValueByPath(path: string, obj: Record<any, any>) {
		return path.split(".").reduce((old, key) => old?.[key], obj)
	}

	private setValueByPath(path: string, obj: Record<any, any>, value: any) {
		let [root, nestedPath] = path.split(/\.(.*)/s)

		if (!obj[root] && nestedPath) {
			return obj
		}

		obj[root] = nestedPath ? this.setValueByPath(nestedPath, obj[root], value) : value

		return obj
	}

	private starRenderingListerners() {
		let interval = setInterval(() => {
			if (this.Component.isDestroyed()) {
				clearInterval(interval)
				return
			}
			let element = this.Component.getDomRef()

			if (element && this.firstRendered === false) {
				this.firstRendered = true
				this.onFirstRender()
			}

			if (element && this.rendered === false) {
				this.rendered = true
				this.onRendering()
			}

			if (!element && this.rendered === true) {
				this.rendered = false
				this.onDerender()
			}
		})
	}

	public onInit() {
		throw new Error("Função OnInit não construida")
	}

	public onFirstRender() { }

	public onRendering() { }

	public onDerender() { }

	public setModel(oModel: Model, sName?: string) {
		this.Component.setModel(oModel, sName)
		return this
	}

	public getModel(modelName?: string): JSONModel {
		return this.Component.getModel(modelName) as JSONModel
	}

	/**
	 * AVISO: Essa função não deve ser chamada na 'onInit', deve ser chamada apenas após a página ter sido renderizada!
	 */
	public getDefaultModel(modelName: string): JSONModel {
		let element = this.Component.getDomRef()
		if (!element) {
			throw new Error("Função getDefaultModel chamada antes do fragment ser renderizado. Esta função só pode ser chamada após a função onFirstRender")
		}
		let view = this.getControlView(this.Component)
		let controller = view.getController()

		return controller.getOwnerComponent().getModel(modelName) as JSONModel
	}

	public getControlView(component: Control): View {
		if (component.getMetadata().getName() === "sap.ui.core.mvc.XMLView") {
			return component as View
		}
		return this.getControlView(component.getParent() as Control)
	}

	public bindParamModel(paramName: keyof FragmentType['params'], modelName: string, modelPath = "/") {
		this.getModel(modelName).bindProperty(modelPath).attachChange(() => {
			this.ComponentParams[paramName] = this.getModel(modelName).getData()
		})
	}

	public getParam<Key extends keyof FragmentType['params']>(paramName: Key): FragmentType['params'][Key] {
		return this.ComponentParams[paramName]
	}

	public getById<Component extends UI5Element>(id: string): Component {
		return this.Component.findElements(true).find((item) => item.data("id") === id) as Component
	}

	public getMethods(): BaseFragmentReturn<FragmentType> & FragmentType['methods'] {
		return {
			getById: this.getById.bind(this),
			getParam: this.getParam.bind(this),
			...this.methods
		}
	}

	public set busy(value: boolean) {
		this.Component.setBusy(value)
	}

	public get busy() {
		return this.Component.getBusy()
	}
}