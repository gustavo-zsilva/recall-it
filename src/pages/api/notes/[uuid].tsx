import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from '../../../lib/firebase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { uuid, uid } = req.query

    switch (method) {
        case 'PATCH':
            try {
                await firestore
                    .collection('users')
                    .doc(String(uid))
                    .collection('notes')
                    .doc(String(uuid))
                    .update({
                        historic: req.body.data,
                    })

                res.status(201).json({ message: 'Document updated with success' })
            } catch (err) {
                res.status(500).json({ message: err.message })
            }
            break
    }
}