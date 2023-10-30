import UIComponent from "sap/ui/core/UIComponent";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Router from "sap/ui/core/routing/Router";
import BTIController from "bti_framework/Web-Assets/BTIController";
import JSONModel from "sap/ui/model/json/JSONModel";
import { UserSelf } from "bti_framework/connections/_base/users_connection";

export default abstract class BaseController extends BTIController {

	public getRouter(): Router {
		return UIComponent.getRouterFor(this);
	}

	public getResourceBundle(): ResourceBundle | Promise<ResourceBundle> {
		const oModel = this.getOwnerComponent().getModel("i18n") as ResourceModel;
		return oModel.getResourceBundle();
	}

	public getModel(sName?: string) {
		let model = this.getView().getModel(sName) as JSONModel
		return model;
	}

	public setModel(oModel: Model, sName?: string): BaseController {
		this.getView().setModel(oModel, sName);
		return this;
	}

	public getUserData() {
		return new Promise<UserSelf>((resolve) => {
			let user: UserSelf = this.getDefaultModel("dadosUsuario").getData()

			if (user.IdUser) {
				resolve(user)
			}

			let interval = setInterval(() => {
				let user: UserSelf = this.getDefaultModel("dadosUsuario").getData()

				if (user.IdUser) {
					resolve(user)
					clearInterval(interval)
				}
			})
		})
	}

	set busy(newValue: boolean) {
		this.getView().setBusy(newValue)
	}
}
