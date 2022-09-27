import {fetchWrapper} from "./fetch-wrapper";

const send = (secretKey, scoreId, studentId, description = '') => {
    return fetchWrapper.post('/api/penalty', {key: secretKey, score: scoreId, student: studentId, desc: description})
}

export const penaltyService = {send}