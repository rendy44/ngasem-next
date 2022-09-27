import {fetchWrapper} from "./fetch-wrapper";

const getCategories = () => {
    return fetchWrapper.get('/api/categories')
}
const getScores = categoryId => {
    return fetchWrapper.get(`/api/scores/${categoryId}`)
}
const getGradeMajors = gradeCode => {
    return fetchWrapper.get(`/api/grades/${gradeCode}`)
}
const getStudents = gradeId => {
    return fetchWrapper.get(`/api/students/${gradeId}`)
}
export const dataService = {getCategories, getScores, getGradeMajors, getStudents}