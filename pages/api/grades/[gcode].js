import {apiService} from "../../../services/api.service";
import NodeCache from "node-cache";

const myCache = new NodeCache();
export default function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({message: 'Only GET requests allowed'})
        return
    }
    const {gcode} = req.query
    const cacheKey = `get_grades_${gcode}`
    if (myCache.has(cacheKey)) {
        res.status(200).send(myCache.get(cacheKey))
    } else {
        apiService.getGrades(gcode)
            .then(data => {
                myCache.set(cacheKey, data, 3600 * 6)
                res.status(data.status).send(data)
            })
    }
}