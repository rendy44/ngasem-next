import {fetchWrapper} from "./fetch-wrapper";

const login = (user, password) => {
    return fetchWrapper.post('login', {user: user, password: password}, false)
}

export const apiService = {login}