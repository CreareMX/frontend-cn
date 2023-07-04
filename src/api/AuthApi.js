import axiosApi from "./axiosApi"

export const postLogin = async (data) =>{
    const _URL = '/api/Login'
    
    return axiosApi.post(_URL, data)
}

