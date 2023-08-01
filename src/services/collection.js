import {getApi,postApi,putApi,deleteApi} from "./ApiMethod";
export function login(url,payload) {
    return postApi(url,payload)
}
export function fetchEmissionSustain(url) {
    return getApi(url);
}

export function fetchEmissionINtensity(url) {
    return getApi(url);
}
export function getUserProfile(url) {
    return getApi(url)
}
export function updateRecord(url,data) {
    return putApi(url,data);
}
export function deleteRecord(url,data) {
    return deleteApi(url,data);
}