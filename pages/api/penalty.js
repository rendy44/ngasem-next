import {apiService} from "../../services/api.service";

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({message: 'Only POST requests allowed'})
        return
    }

    const {key, score, student, desc} = req.body;
    apiService.submitPenalty(key, score, student, desc)
        .then(data => {
            res.status(data.status).send(data)
        })
}