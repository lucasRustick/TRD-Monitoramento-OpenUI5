import BaseController from "./BaseController"

export class BaseSection<T extends BaseController> {
    protected instance: T

    constructor(instance: T) {
        this.instance = instance
    }
}