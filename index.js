const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app =express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4j3msur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;






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
    const TouristsSpotCollection=client.db('AsiaExplorerDB').collection('TouristsSpot')
    app.get('/TouristsSpot',async(req,res)=>{
      const cursor=TouristsSpotCollection.find()
      const result =await cursor.toArray()
      res.send(result)
  })

    app.post('/TouristsSpot',async(req,res)=>{
      const newSpot=req.body
      console.log(newSpot);
      const result=await TouristsSpotCollection.insertOne(newSpot)
      res.send(result)
  })







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get ('/',(req,res)=>{
    res.send("B9-A10-Asia-Explorer-client server is running")
})
app.listen(port,()=>{
    console.log(`B9-A10-Asia-Explorer-client server is running on port ${port}`);
})