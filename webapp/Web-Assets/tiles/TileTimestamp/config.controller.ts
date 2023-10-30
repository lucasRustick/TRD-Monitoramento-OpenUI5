import JSONModel from "sap/ui/model/json/JSONModel";
import BaseFragment from "../../BaseFragment";
import GenericTile from "sap/m/GenericTile";
import Text from "sap/m/Text";

export type TileTimestampType = {
	params: TileTimestampParams
	component: GenericTile
}

export type TileTimestampParams = {
	tileConfig: {
		titulo?: string
		timestamp?: string
	},
	dados: JSONModel
}

export default class TileTimestamp extends BaseFragment<TileTimestampType> {

	public onInit() {
		let config = this.getParam("tileConfig")

		this.setModel(new JSONModel(config), "config_tile")

		this.getModel("dados").bindProperty("/").attachChange(() => {
			if (!config.timestamp || this.Component.isDestroyed()) {
				return
			}

			let dados = this.getModel("dados").getData()
			this.getById<Text>("text").setText(new Date(dados[config.timestamp] * 1000).toLocaleString('pt-br'))
		})
	}
}
