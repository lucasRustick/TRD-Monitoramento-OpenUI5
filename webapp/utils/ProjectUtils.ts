export namespace ProjectUtils {
    const _events: EventObject = {
        loginPageLoad: []
    }

    export const events = {
        add(eventName: keyof RegisteredEvents, key: string, eventFunction: (data: any) => void) {
            _events[eventName].push({ key, eventFunction })
        },

        addOnce(eventName: keyof RegisteredEvents, key: string, eventFunction: (data: any) => void) {
            _events[eventName].push({ key, eventFunction, single: true })
        },

        remove(eventName: keyof RegisteredEvents, key: string) {
            _events[eventName] = _events[eventName].filter((item) => item.key !== key)
        },

        fire(eventName: keyof RegisteredEvents, data?: any) {
            _events[eventName].forEach((item) => {
                item.eventFunction(data)
            })

            _events[eventName] = _events[eventName].filter((item) => item.single !== true)
        }
    }
}

type RegisteredEvents = {
    loginPageLoad: string
}

type EventObject = Record<keyof RegisteredEvents, EventConfig[]>

type EventConfig = {
    key: string
    eventFunction: (data?: any) => void
    single?: boolean
}