import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from '../../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const users = await firestore
                .collection('users')
                .get();

                return res.status(200).json(users);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
           
            break;
        case 'POST':
            try {
                 await firestore
                    .collection('users')
                    .doc(req.body.uid)
                    .set(req.body.data)

                res.status(200).json({ message: 'Account created with success' });
            } catch (err) {
                console.log(req.body)
                res.status(500).json({ message: err.message });
            }
            
            break;
    }
}