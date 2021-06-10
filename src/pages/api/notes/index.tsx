import { firestore } from '../../../lib/firebase';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { uid } = req.query;

    switch (method) {
        case 'GET':
            try {
                const notesSnapshot = await firestore
                    .collection('users')
                    .doc(String(uid))
                    .collection('notes')
                    .get()
                
                const notes = notesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.data().id }));

                res.status(201).json(notes);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }

            break;

        case 'POST':
            try {
                await firestore
                    .collection('users')
                    .doc(String(uid))
                    .collection('notes')
                    .add(req.body.data)

                res.status(201).json({ message: 'Note saved with success!' });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;
    }
}