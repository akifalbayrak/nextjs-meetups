import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI not set');
      res.status(500).json({ message: 'Database connection string not configured' });
      return;
    }

    let client;
    try {
      client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db();

      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne(data);
      client.close();

      res.status(201).json({ message: "Meetup created", id: result.insertedId });
    } catch (error) {
      console.error('Error inserting meetup:', error);
      if (client) client.close();
      res.status(500).json({ message: 'Could not insert data', error: error.message });
    }
  }
}
