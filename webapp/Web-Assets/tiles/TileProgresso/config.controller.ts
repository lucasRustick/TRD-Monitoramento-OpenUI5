import JSONModel from "sap/ui/model/json/JSONModel";
import BaseFragment from "../../BaseFragment";
import GenericTile from "sap/m/GenericTile";

export type TileProgressoType = {
	params: TileProgressoParams
	component: GenericTile
}

type TileProgressoParams = {
	tileConfig: {
		titulo?: string
		subtitulo?: string
		texto?: string
		max?: string
		actual?: string
	},
	dados: JSONModel
}

export default class TileProgresso extends BaseFragment<TileProgressoType> {

	public onInit() {
		let config = this.getParam("tileConfig")

		this.setModel(new JSONModel(config), "config_tile")
	}
}
