import {fetchWrapper} from "./fetch-wrapper";

const login = (user, password) => {
    return fetchWrapper.post('login', {
        user: user,
        password: password
    }, false)
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
const submitPenalty = (secretKey, scoreId, studentId, description = '') => {
    return fetchWrapper.post('penalty', {
        key: secretKey,
        score: scoreId,
        student: studentId,
        desc: description
    }, false)
}
const searchStudent = nis => {
    return fetchWrapper.get(`search?nis=${nis}`, false)
}
const getStudentDetail = id => {
    return fetchWrapper.get(`student?id=${id}`, false)
}
const getAccountDetail = key => {
    return fetchWrapper.get(`account?key=${key}`, false)
}
export const apiService = {
    login,
    getCategories,
    getScores,
    getGrades,
    getStudents,
    submitPenalty,
    searchStudent,
    getStudentDetail,
    getAccountDetail,
}