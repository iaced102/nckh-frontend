// import API from './api'
import { appConfigs } from './../configs'
import { feeAjax } from './feeAjax'

// const coreAPI = new API(appConfigs.getAPIUrl(appConfigs.apiDomain.auth))
export const userAPI = {
    login(userName, password) {
        let data = {
            userName: userName,
            password: password
        }
        let options = {
            method: 'POST',
            crossDomain: true,
            data: data,
            url: appConfigs.getAPIUrl(appConfigs.apiDomain.auth) + 'login',
            headers: {}
        }
        return feeAjax(options)
        // return coreAPI.post('login', data)
    }
}
