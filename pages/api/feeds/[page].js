import {apiService} from "../../../services/api.service";

export default function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({message: 'Only POST requests allowed'})
        return
    }

    const {page} = req.query;
    apiService.getFeeds(page)
        .then(data => {
            res.status(data.status).send(data)
        })
}