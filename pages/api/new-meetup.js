import {MongoClient} from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
// =================================CONNECTING TO DATABASE============================
        const client = await MongoClient.connect(
            'mongodb+srv://LBThree:3gL4Tjn5reeqMEz@cluster0.uzbiq.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
// =================================CONNECTING TO DATABASE============================

// ================================INSERTING DATA=====================================
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: 'Meetup inserted!'});
// ================================INSERTING DATA=====================================
    }

    // const { MongoClient, ServerApiVersion } = require('mongodb');
    // const uri = "mongodb+srv://LBThree:<3gL4Tjn5reeqMEz>@cluster0.uzbiq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    // client.connect(err => {
    //     const collection = client.db("test").collection("devices");
    //     // perform actions on the collection object
    //     client.close();
    // });

}

export default handler;