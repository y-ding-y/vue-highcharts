
import axios from 'axios'
import { param } from 'jquery'


export function UserLogin(params) {
    return axios.get("/api/User/Login", {
        params: params
    })
};

export async function SearchInfo(params) {
    return await axios.get("/api/SearchInfo", {
        params: params
    })
};

export function GetInfo(params) {
    return axios.get("/api/GetInfo", {
        params: params
    })
}

export function DownInfo(params) {
    return axios.get("/api/DownInfo", {
        params: params
    })
}

export function Highcharts(params) {
    return axios.get("/api/Highcharts", {
        params: params
    })
}

export function UploadFile(params){
    return axios.get("/api/PartsInfo/upload",{
        params: params
    })
}

 