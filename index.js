const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


// middleware
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "altprodinsights.web.app",
//       "altprodinsights.firebaseapp.com"
//     ],
//     credentials: true,
//   })
// ); 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Alternative product is searching!');
    });
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const recommendationCollection = database.collection('Recommendation');

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
    
    app.get('/queriess/:email', async (req, res) => {
      const email = req.params.email;
      const query = await collection.find({email: email}).toArray();
      res.send(query);
      console.log(email);
    });
    app.get('/queries/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      console.log(id);
      const result = await collection.findOne(query);
      res.send(result);
     
    }); 
    app.get('/myQueries/:id',async (req,res)=>{
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await collection.findOne(query);
      res.send(result);
      
    }) 
    app.patch('/myQueries/update/:id', async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const updatedQuery = {
        $set: {
          productName: req.body.productName,
          productBrand: req.body.productBrand,
          productImageUrl: req.body.productImageUrl,
          queryTitle: req.body.queryTitle,
          buyingReasonDetails: req.body.buyingReasonDetails,
        },
      };
      const result = await collection.updateOne(query, updatedQuery)
      console.log(result);
      res.send(result)
     
  });
  app.delete('/myQueries/delete/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.deleteOne(query);
    res.send(result);
  });
    app.patch('/allQueries/:id', async (req, res) => {
      const queryId = req.params.id;
  
      try {
        // Update the query document using $inc operator
        const result = await collection.updateOne(
          { _id: new ObjectId(queryId) },
          { $inc: { recommendationCount: 1 } }
        );
  
        if (result.modifiedCount === 1) {
          res.status(200).json({ message: 'Recommendation count updated successfully' });
        } else {
          res.status(404).json({ error: 'Query document not found' });
        }
      } catch (error) {
        console.error('Error updating recommendation count:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    app.post('/recommendations', async (req, res) => {
      const  newRecommendation  = req.body;
      // console.log(newRecommendation);
      const result = await recommendationCollection.insertOne( newRecommendation );
      res.send(result);
    });
    app.get('/recommendations', async (req, res) => {
      const cursor = recommendationCollection.find({});
      const recommendations = await cursor.toArray();
      res.send(recommendations);
    }
    );
    app.get('/recommendations/:email', async (req, res) => {
      const email = req.params.email;
      const recommendation = await recommendationCollection .find({RecommenderEmail: email}).toArray(); 
      res.send(recommendation);
    });
    app.get('/ForMeRecommendations/:email', async (req, res) => {
      const email = req.params.email;
      const recommendation = await recommendationCollection.find({userEmail: email}).toArray(); 
      res.send(recommendation);
    });
app.get('/ForMeRecommendations/:email', async (req, res) => {
  const email = req.params.email;
  const recommendation = await recommendationCollection.find({userEmail: email}).toArray(); 
  res.send(recommendation);
});
app.get('/ForMeRecommendations/:email', async (req, res) => {
  const email = req.params.email;
  const recommendation = await recommendationCollection.find({userEmail: email}).toArray(); 
  res.send(recommendation);
});
app.get('/meRecommendations/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
      console.log(id);
      const result = await recommendationCollection.findOne(query);
      res.send(result);
}
);

    

    
    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
