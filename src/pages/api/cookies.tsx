import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { uid } = req.query
    const { 'Authorization': token } = req.headers

    switch (method) {
        case 'GET':
            res.status(201).json({ uid, token })
            break
    }
}