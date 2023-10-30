import { Axios } from "axios";
import ComboBox from "sap/m/ComboBox";
import Label, { $LabelSettings } from "sap/m/Label";
import MultiComboBox from "sap/m/MultiComboBox";
import ManagedObject from "sap/ui/base/ManagedObject";
import Control from "sap/ui/core/Control";
import Title from "sap/ui/core/Title";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import JSONModel from "sap/ui/model/json/JSONModel";
import BaseFragment from "../BaseFragment";
import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";

declare const axios: Axios

export type FormDinamicoType = {
	params: FormDinamicoParams
	component: SimpleForm
	methods: FormDinamicoMethods
}

type FormDinamicoMethods = {
	setTitle: (title: string) => void
	getField: <T extends Control>(id: string) => T
	configFinished: () => Promise<void>
}

type FormDinamicoParams = {
	fields: Field[]
	fieldData: JSONModel
	config?: {
		title?: string
	}
}

export type Field = {
	id: string,
	component: typeof Control,
	label?: string | $LabelSettings,
	items?: {
		query?: string
		data?: any[]
		bindingInfo: {
			path?: string
			template: ManagedObject
		}
	},
	props?: Record<string, any>,
	customData?: Record<string, any>
}

export default class FormDinamico extends BaseFragment<FormDinamicoType> {

	configFinished: boolean = false

	public async onInit() {
		await this.configFields()
		this.configFinished = true
	}

	private async configFields() {
		let form = this.Component

		if (this.getParam("config")?.title) {
			form.addContent(new Title({ text: this.getParam("config").title }))
		}

		for await (let campo of this.getParam("fields")) {
			// Cria o campo, passando a biblioteca e o tipo do campo e as propriedades especificas
			let elemento = new campo.component(campo.props)

			if (campo.customData) elemento.data(campo.customData)

			elemento.data("id", campo.id)

			// Se tiver a propriedade items, pega os dados da consulta e adiciona os items ao campo
			if (campo.items && (elemento instanceof ComboBox || elemento instanceof MultiComboBox)) await this.configCombo(elemento, campo)

			// Cria o label e adiciona tudo ao fomulário
			if (campo.label) {
				let label = new Label(typeof campo.label == "object" ? campo.label : { text: campo.label })
				form.addContent(label)
			}

			form.addContent(elemento)
		}
	}

	async configCombo(elemento: ComboBox | MultiComboBox, campo: Field) {
		let dados = campo.items.data || await this.loadData(campo.items.query)

		elemento.setModel(new JSONModel(dados))

		elemento.bindAggregation("items", {
			path: "/",
			...campo.items.bindingInfo
		})
	}

	async loadData(query: string) {
		try {
			let { data } = await axios.get(query)

			return data
		} catch (error) {
			AssetsUtils.handleError(error, "Ocorreu um erro ao carregar os dados dos campos")
			return []
		}
	}

	methods: FormDinamicoMethods = {
		setTitle: (title) => {
			let [titleComponent] = this.Component.getContent()

			if (titleComponent instanceof Title) {
				titleComponent.setText(title)
				return
			}

			this.Component.insertContent(new Title({ text: title }), 0)
		},
		getField: <T extends Control>(id: string) => {
			return this.getById<T>(id)
		},
		configFinished: () => {
			return new Promise((resolve) => {
				setInterval(() => {
					if (this.configFinished) resolve()
				}, 100)
			})
		}
	}
}