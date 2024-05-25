import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        const client = await MongoClient.connect(
            "mongodb+srv://akif:Xa5f9stib7d72D1E@cluster0.pizeaf2.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
        );

        const db = client.db();

        const meetupsCollection = db.collection("meetups");

        const result = await meetupsCollection.insertOne(data);

        client.close();

        res.status(201).json({ message: "Meetup created" });
    }
}
