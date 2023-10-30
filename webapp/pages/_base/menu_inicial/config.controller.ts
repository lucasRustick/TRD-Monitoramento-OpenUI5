import { menu_inicial } from "bti_framework/model/UIdata/menu_inicial";
import BaseController from "bti_framework/utils/base/BaseController";
import Event from "sap/ui/base/Event";
import Control from "sap/ui/core/Control";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class MenuController extends BaseController {

	public onInit(): void {
		this.setModel(new JSONModel(), "menuTiles")
		this.loadMenuTiles()
	}

	private async loadMenuTiles() {
		let userData = await this.getUserData()

		let userGroupType = userData.UserGroups.at(0).IdUserGroupType

		this.getModel("menuTiles").setData(menu_inicial.map((item) => {
			item.data = item.data.filter((subItem) => {
				return subItem.IdUserGroupType >= userGroupType
			})
			return item
		}))
	}

	public link(event: Event) {
		let botao = event.getSource() as Control

		location.hash = botao.data("key")
	}
}
