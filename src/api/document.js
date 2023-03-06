// import API from './api'
import { appConfigs } from './../configs'
import { feeAjax } from './feeAjax'

// const coreAPI = new API(appConfigs.getAPIUrl(appConfigs.apiDomain.auth))
export const documentAPI = {
    createDocument(columnDefs, rawData) {
        let data = {
            columnDefs: columnDefs,
            rawData: rawData    
        }
        let feeUserInfo =JSON.parse(localStorage.getItem('feeUserInfo'))
        console.log(feeUserInfo.access_token)
        console.log(localStorage.getItem('feeUserInfo'))
        let options = {
            method: 'POST',
            crossDomain: true,
            data: JSON.stringify(data),
            url: appConfigs.getAPIUrl(appConfigs.apiDomain.document) + 'create',
            headers: {
                authorization: 'Bearer '+ feeUserInfo.access_token
            }
        }
        console.log(options)
        return feeAjax(options)
        // return coreAPI.post('login', data)
        
    },
    getListDocument() {
        let feeUserInfo =JSON.parse(localStorage.getItem('feeUserInfo'))
        let options = {
            method: 'GET',
            crossDomain: true,
            data: {},
            url: appConfigs.getAPIUrl(appConfigs.apiDomain.document) + 'getList',
            headers: {
                authorization: 'Bearer '+ feeUserInfo.access_token
            }
        }
        return feeAjax(options)
    },
    detailDocument(id) {
        let feeUserInfo =JSON.parse(localStorage.getItem('feeUserInfo'))
        let options = {
            method: 'GET',
            crossDomain: true,
            data: {},
            url: appConfigs.getAPIUrl(appConfigs.apiDomain.document) + 'detail/' + id,
            headers: {
                authorization: 'Bearer '+ feeUserInfo.access_token
            }
        }
        return feeAjax(options)
        
    }
}
