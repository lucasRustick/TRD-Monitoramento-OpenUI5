import { AssetsUtils } from "bti_framework/Web-Assets/AssetsUtils";
import { BindTableReturnSingle, Database } from "bti_framework/connections/Database";
import MessageBox from "sap/m/MessageBox";

export class Class_Users_Connections {

    public async login(login: string, password: string) {
        try {
            let { data } = await axios.get<{ token: string }>(`/Base/users/login=${login}/password=${md5(password)}`)

            localStorage.setItem("token", data.token)

            location.hash = "#/menu"
            location.reload()

        } catch (error: any) {
            if (error.response?.status === 401) {
                MessageBox.warning(error.response.data.msg)
                return
            }
            AssetsUtils.handleError(error, "Ocorreu um erro ao fazer o login!")
        }
    }

    public async getSelf() {
        let { data } = await axios.get<Database.Users>("/Base/users/getSelf")

        return data
    }

    public updatePassword(newPassword: string) {
        return axios.put(`/Base/updatePassword/newPassword=${newPassword}`)
    }
}

export const Users_Connections = new Class_Users_Connections()

export type GroupWithType = BindTableReturnSingle<Database.UserGroupTypes, Database.UserGroups, "UserGroupTypes">

export type UserSelf = BindTableReturnSingle<GroupWithType, Database.Users, "UserGroups">