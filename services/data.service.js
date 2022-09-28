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
const searchStudent = nis => {
    return fetchWrapper.get(`/api/search?nis=${nis}`)
}
const getStudentDetail = id => {
    return fetchWrapper.get(`/api/student/${id}`)
}
export const dataService = {getCategories, getScores, getGradeMajors, getStudents, searchStudent, getStudentDetail}