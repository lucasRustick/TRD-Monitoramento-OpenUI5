import { Database } from "bti_framework/connections/Database";

export class Class_PasswordRecovery_Connections {

    public async getAllPending() {
        let { data } = await axios.get<Database.PasswordRecoverys[]>("/Base/password_recovery")
        return data
    }

    public create(login: string) {
        return axios.post(`/Base/password_recovery/login=${login}`)
    }

    public updateStatus(id: number, status: boolean) {
        return axios.put<Database.PasswordRecoverys[]>(`/Base/password_recovery/id=${id}}/status=${status}`)
    }
}

export const PasswordRecovery_Connections = new Class_PasswordRecovery_Connections()