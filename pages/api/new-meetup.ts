import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { Meetup } from "../../types/meetup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data: Meetup = req.body;

    if (!data.title || !data.address || !data.image || !data.description) {
      return res.status(400).json({ message: "Invalid input" });
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not set");
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res
      .status(201)
      .json({ message: "Meetup created", id: result.insertedId.toString() });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
