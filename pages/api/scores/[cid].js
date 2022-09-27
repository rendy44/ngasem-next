import {apiService} from "../../../services/api.service";

export default function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({message: 'Only GET requests allowed'})
        return
    }
    const {cid} = req.query
    apiService.getScores(cid)
        .then(data => {
            res.status(data.status).send(data)
        })
}