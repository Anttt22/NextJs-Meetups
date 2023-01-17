// api/new-meetup.js
//POST /api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    //const [title, image, adress, description] = data;

    const client = await MongoClient.connect(
      'mongodb+srv://anton22:anton22@cluster0.uzv5pzb.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const result = await meetupCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'meetup inserted' });
  }
}

export default handler;
