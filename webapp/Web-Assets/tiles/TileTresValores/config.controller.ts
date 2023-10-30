import JSONModel from "sap/ui/model/json/JSONModel";
import BaseFragment from "../../BaseFragment";
import GenericTile from "sap/m/GenericTile";

export type TileTresValoresType = {
	params: TileTresValoresParams
	component: GenericTile
}

type TileTresValoresParams = {
	tileConfig: {
		titulo?: string
		subTitulo?: string
		prefixo_1?: string
		prefixo_2?: string
		prefixo_3?: string
		valor_1?: string
		valor_2?: string
		valor_3?: string
		sulfixo_1?: string
		sulfixo_2?: string
		sulfixo_3?: string
	},
	dados: JSONModel
}

export default class TileTresValores extends BaseFragment<TileTresValoresType> {

	public onInit() {
		let config = this.getParam("tileConfig")

		this.setModel(new JSONModel(config), "config_tile")
	}
}
