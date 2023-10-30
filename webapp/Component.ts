import UIComponent from "sap/ui/core/UIComponent";
import models from "./model/models";

/**
 * @namespace bti_framework
 */
export default class Component extends UIComponent {
	public static metadata = {
		manifest: "json",
	};

	public init(): void {
		// call the base component's init function
		super.init();

		// create the device model
		this.setModel(models.createDeviceModel(), "device");

		// create the views based on the url/hash
		this.getRouter().initialize();
	}
}
