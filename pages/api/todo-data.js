import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://punamgupta250602:punam123@cluster0.vicanvy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const todoCollection = db.collection('todolist');
  const result = await todoCollection.find().toArray();

  res.status(200).json({ data: result })
}