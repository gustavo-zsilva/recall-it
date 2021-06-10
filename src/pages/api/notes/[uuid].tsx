import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from '../../../lib/firebase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { uuid, uid } = req.query

    switch (method) {
        case 'PATCH':
            try {
                const xd = await firestore
                    .collection('users')
                    .doc(String(uid))
                    .collection('notes')
                    .where('id', '==', uuid)
                    .get()
                
                console.log(xd.docs[0].data())
            } catch (err) {
                res.status(500).json({ message: err.message })
            }
            break
    }
}