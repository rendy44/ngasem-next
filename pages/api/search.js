import {apiService} from "../../services/api.service";

export default function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({message: 'Only GET requests allowed'})
        return
    }

    const {nis} = req.query;
    apiService.searchStudent(nis)
        .then(data => {
            res.status(data.status).send(data)
        })
}