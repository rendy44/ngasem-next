import {fetchWrapper} from "./fetch-wrapper";

const login = (user, password) => {
    return fetchWrapper.post('/api/login', {user: user, password: password})
}

export const userService = {login}