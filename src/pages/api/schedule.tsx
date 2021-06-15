import { NextApiRequest, NextApiResponse } from "next";
import firebase, { firestore } from "../../lib/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { uid } = req.query
    const { uuid } = req.body
    const { 'Authorization': token } = req.headers

    switch (method) {
        case 'GET':
            break

        case 'POST':
            try {
                await firestore
                    .collection('users')
                    .doc(String(uid))
                    .collection('notes')
                    .doc(uuid)
                    .update({
                        schedule: firebase.firestore.FieldValue.serverTimestamp()
                    })

                res.status(201).json({ message: `Schedule set to ${req.body.data}` })
            } catch (err) {
                res.status(500).json({ message: err.message })
            }
            break
    }
}