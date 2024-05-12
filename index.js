const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();



// middleware
app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Alternative product is searching!');
    });
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const e = require('express');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pflyccd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const database = client.db('AltProdInsights');
    const collection = database.collection('Queries');

    app.post('/queries', async (req, res) => {
      const  newQuery  = req.body;
      console.log(newQuery);
      const result = await collection.insertOne( newQuery );
      res.json(result);
    });
    app.get('/queries', async (req, res) => {
      const cursor = collection.find({});
      const queries = await cursor.toArray();
      res.json(queries);
    });
    app.get('/queries/:email', async (req, res) => {
      const email = req.params.email;
      const query = await collection.find({email: email}).toArray();
      res.send(query);
      console.log(email);
    });
    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
