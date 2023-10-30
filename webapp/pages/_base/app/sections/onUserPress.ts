import { BaseSection } from "bti_framework/utils/base/BaseSection";
import AppController from "../config.controller";
import { ChangePassword } from "./changePassword";

export class onUserPress extends BaseSection<AppController> {

    secChangePassword = new ChangePassword(this.instance)

    changePassWord(oldPassword: string) {
        this.secChangePassword.changePassword(oldPassword, true)
    }

    exit() {
        this.instance.getView().destroy()
        localStorage.clear()
        location.hash = "#/"
        location.reload()
    }
}