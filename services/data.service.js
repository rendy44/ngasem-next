import {fetchWrapper} from "./fetch-wrapper";

const getCategories = () => {
    return fetchWrapper.get('categories')
}
const getScores = categoryId => {
    return fetchWrapper.get(`scores?category=${categoryId}`)
}
const getGradeMajors = gradeCode => {
    return fetchWrapper.get(`grades?grade=${gradeCode}`)
}
const getStudents = gradeId => {
    return fetchWrapper.get(`students?grade=${gradeId}`)
}
export const dataService = {getCategories, getScores, getGradeMajors, getStudents}