import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
        "mongodb+srv://punamgupta250602:punam123@cluster0.vicanvy.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const todoCollection = db.collection("todolist");
    const result = await todoCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "successfully added todo!", _id: result.insertedId });
  }

}

export default handler;