import JSONModel from "sap/ui/model/json/JSONModel";
import BaseFragment from "../../BaseFragment";
import GenericTile from "sap/m/GenericTile";
import Icon from "sap/ui/core/Icon";
import MessageToast from "sap/m/MessageToast";

export type TileStatusType = {
	params: TileStatusParams
	component: GenericTile
	methods: {
		setStatus: (status: boolean) => void
		setTileConfig: (status: TileStatusParams['tileConfig']) => void
	}
}

export type TileStatusParams = {
	tileConfig: {
		titulo?: string
		subTitulo?: string
		success_icon?: string
		error_icon?: string
		success_color?: string
		error_color?: string
	}
}

export default class TileStatus extends BaseFragment<TileStatusType> {

	public defaultParams: Partial<TileStatusParams> = {
		tileConfig: {
			subTitulo: "Status máquina",
			error_icon: "sap-icon://error",
			error_color: "#cd0000",
			success_icon: "sap-icon://process",
			success_color: "#008135"
		}
	};

	public onInit() {
		let config = this.getParam("tileConfig")

		this.setModel(new JSONModel(config), "config_tile")

		if (location.hash === "#/cadastroTiles") {
			this.Component.attachPress(() => {
				let status = this.getById<Icon>("iconSuccess").getVisible()
				this.setStatus(!status)
			})

			MessageToast.show("Clique no Tile para alternar entre Sucesso e Erro!")
		}
	}

	public setStatus(status: boolean) {
		this.getById<Icon>("iconSuccess").setVisible(status)
		this.getById<Icon>("iconError").setVisible(!status)
	}

	methods = {
		setStatus: (status: boolean) => this.setStatus(status),
		setTileConfig: (tileConfig: TileStatusParams['tileConfig']) => {
			this.getModel("config_tile").setData(tileConfig, true)
		}
	};
}
