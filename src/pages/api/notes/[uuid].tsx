import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from '../../../lib/firebase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { uuid, uid } = req.query
    console.log(uuid)

    switch (method) {
        case 'PATCH':
            try {
                const noteSnapshot = await firestore
                    .collection('users')
                    .doc(String(uid))
                    .collection('notes')
                    .where('uuid', '==', uuid)
                    .get()

                const noteID = noteSnapshot.docs[0].id
                await firestore
                    .collection('users')
                    .doc(String(uid))
                    .collection('notes')
                    .doc(noteID)
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