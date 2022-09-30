import {fetchWrapper} from "./fetch-wrapper";

const login = (user, password) => {
    return fetchWrapper.post('/api/login', {user: user, password: password})
}
const detail = key => {
    return fetchWrapper.get(`/api/account/${key}`)
}

export const userService = {login, detail}