import JSONModel from "sap/ui/model/json/JSONModel";
import Controller from "sap/ui/core/mvc/Controller";
import UI5Element from "sap/ui/core/Element";

/**
 * @namespace bti.framework.controller
 */
export default abstract class BTIController extends Controller {

    public getById<T extends UI5Element>(id: string) {
        return this.byId(id) as T
    }

    public getDefaultModel(modelName: string) {
        return this.getOwnerComponent().getModel(modelName) as JSONModel
    }
}
