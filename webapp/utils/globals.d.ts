import moment from "moment";
import { Axios } from "axios"
import * as chartjs from 'chart.js'
import * as socket from 'socket.io-client'

declare global {
    const moment: moment
    const axios: Axios
    declare function md5(param: string): string
    declare class Chart extends chartjs.Chart { }
    declare function io(...params: Parameters<typeof socket.io>): ReturnType<typeof socket.io>
}