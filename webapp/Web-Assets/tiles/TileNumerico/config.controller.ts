import JSONModel from "sap/ui/model/json/JSONModel";
import BaseFragment from "../../BaseFragment";
import GenericTile from "sap/m/GenericTile";

export type TileNumericoType = {
	params: TileNumericoParams,
	component: GenericTile
}

type TileNumericoParams = {
	tileConfig: {
		titulo?: string
		unidade_de_medida?: string
		valor_numerico?: string
	},
	dados: JSONModel
}

export default class TileNumerico extends BaseFragment<TileNumericoType> {

	public onInit() {
		let config = this.getParam("tileConfig")

		this.setModel(new JSONModel(config), "config_tile")
	}
}
