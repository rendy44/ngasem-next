import {fetchWrapper} from "./fetch-wrapper";

const login = (user, password) => {
    return fetchWrapper.post('login', {user: user, password: password}, false)
}
const getCategories = () => {
    return fetchWrapper.get('categories', false)
}
const getScores = categoryId => {
    return fetchWrapper.get(`scores?category=${categoryId}`, false)
}
const getGrades = gradeCode => {
    return fetchWrapper.get(`grades?grade=${gradeCode}`, false)
}
const getStudents = gradeId => {
    return fetchWrapper.get(`students?grade=${gradeId}`, false)
}

export const apiService = {login, getCategories, getScores, getGrades, getStudents}