import {fetchWrapper} from "./fetch-wrapper";
import {helper} from "./helper";

const send = (scoreId, studentId, description = '') => {
    const myKey = helper.getKey()
    return fetchWrapper.post('penalty', {key: myKey, score: scoreId, student: studentId, desc: description})
}

export const penaltyService = {send}