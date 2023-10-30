import type { AxiosPromise } from "axios"
import { Assets } from "bti_framework/Web-Assets"
import BaseFragment, { FragmentReturn } from "bti_framework/Web-Assets/BaseFragment"
import { Fragments } from "bti_framework/fragments"
import Label from "sap/m/Label"
import MessageBox from "sap/m/MessageBox"
import Control from "sap/ui/core/Control"
import Fragment from "sap/ui/core/Fragment"
import Controller from "sap/ui/core/mvc/Controller"
import Export from "sap/ui/core/util/Export"
import ExportTypeCSV from "sap/ui/core/util/ExportTypeCSV"
import JSONModel from "sap/ui/model/json/JSONModel"
import Table from "sap/ui/table/Table"

export namespace AssetsUtils {

    export function loadAssets<T extends keyof Assets>(path: T, params: Assets[T]['params']) {
        return loadComponent(`bti_framework.Web-Assets.${path}`, params) as Promise<FragmentReturn<Assets[T]>>
    }

    export function BTIloadFragment<T extends keyof Fragments>(path: T, params: Fragments[T]['params']) {
        return loadComponent(`bti_framework.fragments.${path}`, params) as Promise<FragmentReturn<Fragments[T]>>
    }

    async function loadComponent(path: string, params?: Record<string, any>) {

        let instanceController = await Controller.create({
            name: `${path}.config`
        }) as BaseFragment<any>

        if (!instanceController) {
            throw new Error("Fragment não encontrado ou Fragment selecionado não possui um Controller")
        }

        let component = await Fragment.load({
            name: `${path}.index`,
            controller: instanceController
        }) as Control

        if (Array.isArray(component)) {
            throw new Error("O fragment retornar um array de compoentes enquano deveria retornar apenas 1");
        }

        instanceController.onInit_handler(component, params)

        return {
            component,
            ...instanceController.getMethods()
        }
    }

    export function pooling<T extends (...params: any[]) => Promise<void>>(poolingFunction: T, intervalMS: int, errorMessage: string, instance: any, ...params: Parameters<T>) {

        const localHash = location.hash

        const intervalo = setInterval(async () => {
            if (localHash !== location.hash || document.hidden) {
                return
            }

            poolingFunction.call(instance, ...params).catch((error) => {
                clearInterval(intervalo)
                handleError(error, errorMessage)
            })
        }, intervalMS)

        poolingFunction.call(instance, ...params).catch((error) => {
            clearInterval(intervalo)
            handleError(error, errorMessage)
        })

        return intervalo
    }

    export function sleep(time: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, time)
        })
    }

    export async function exportCSV(table: Table, name: string, path: string, model: JSONModel, separator: string = ",") {
        // cria as colunas para serem usadas pela bibliteca Export pra gerar o CSV
        let colunas = table.getColumns().map(item => {
            let template = item.getTemplate()

            if (typeof template == "string") return
            let path = template.getBindingPath("text")
            return {
                name: (item.getLabel() as Label).getText(),
                template: {
                    content: `{${path}}`
                }
            }
        })

        //@ts-ignore Cria o objeto de exportação passando as configurações necessarias
        let oExport = new Export({
            exportType: new ExportTypeCSV({
                separatorChar: separator
            }),
            models: model,
            rows: {
                path: path
            },
            columns: colunas
        })
        oExport.saveFile(name)
    }

    export async function exportCSVFromArray(array: any[], name: string, separator: string = ",") {
        // cria as colunas para serem usadas pela bibliteca Export pra gerar o CSV
        let colunas = Object.keys(array.at(0)).map((item) => {
            return {
                name: item,
                template: {
                    content: `{${item}}`
                }
            }
        })

        //@ts-ignore Cria o objeto de exportação passando as configurações necessarias
        let oExport = new Export({
            exportType: new ExportTypeCSV({
                separatorChar: separator
            }),
            models: new JSONModel(array),
            rows: {
                path: "/"
            },
            columns: colunas
        })
        oExport.saveFile(name)
    }

    export function handleError(error: any, title: string) {
        console.error(title, error)

        if (error.message === "Network Error") {
            return MessageBox.error("Não foi possível se conectar com o Servidor." + "\n\n" + new Date().toLocaleString('pt-br'))
        }

        axios.post("/logs", {
            type: `Log navegador: ${title}`,
            msg: error.toString(),
            stack: error.stack?.split("\n"),
            hash: location.hash,
            data: error.response?.data
        }).catch(() => { })

        let tipo: keyof MessageBox = error.response?.status === 500 || !error.response ? "error" : "warning"

        if (error.response?.status === 406) {
            MessageBox.warning(error.response.data.msg)
            return
        }

        if (![401, 403].includes(error.response?.status)) {
            MessageBox[tipo](title + "\n\n" + new Date().toLocaleString('pt-br'))
            return
        }

        MessageBox[tipo]("Sem permissão para acessar essas informações!", {
            onClose: () => {
                location.hash = "#/menu"
            }
        })
    }

    export function asyncMessageBox(type: keyof MessageBox, text: string, props?: Parameters<MessageBox['alert']>[1]): Promise<keyof typeof MessageBox.Action> {
        return new Promise((resolve) => {

            let box = MessageBox[type]

            if (typeof box !== "function") {
                throw new Error()
            }

            box(text, {
                ...props,
                onClose(action: keyof typeof MessageBox.Action) {
                    resolve(action)
                }
            })
        })
    }

    export async function resolvePromiseObj<T extends Record<string, Promise<any>>>(promises: T): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
        let arrayKeys = Object.keys(promises)
        let resultPromisses = await Promise.all(Object.values(promises))

        return resultPromisses.reduce((old, item, index) => {
            old[arrayKeys[index]] = item

            return old
        }, {})
    }
}