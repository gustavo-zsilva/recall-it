import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../lib/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { uid } = req.query
    const { uuid, schedule } = req.body
    const { 'Authorization': token } = req.headers

    switch (method) {
        case 'POST':
            try {
                await firestore
                    .collection('users')
                    .doc(String(uid))
                    .collection('notes')
                    .doc(uuid)
                    .update({
                        schedule,
                    })

                res.status(201).json({ message: `Schedule set succesfully` })
            } catch (err) {
                res.status(500).json({ message: err.message })
            }
            break
    }
}