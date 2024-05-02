const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app =express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port =process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4j3msur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



const countriesDataAll=[
  
    {
      "country_Name": "Bangladesh",
      "image": "https://tinypic.host/images/2024/05/01/1806-1.jpeg",
      "short_description": "Sundarbans is the largest mangrove forest in the world and a UNESCO World Heritage Site. It is home to the Bengal tiger and diverse wildlife."
     
    },
    {
      "country_Name": "Thailand",
      "image": "https://example.com/bangkok.jpg",
      "short_description": "Bangkok, the capital of Thailand, is known for its vibrant street life, cultural landmarks, and bustling markets.",
    },
    {
      "country_Name": "Indonesia",
      "image": "https://example.com/bali.jpg",
      "short_description": "Bali is a tropical paradise known for its stunning beaches, lush rice terraces, and vibrant culture.",
    },
    {
      "country_Name": "Malaysia",
      "image": "https://example.com/kuala_lumpur.jpg",
      "short_description": "Kuala Lumpur is the capital city of Malaysia known for its modern skyscrapers, cultural landmarks, and vibrant street food scene.",
    },
    {
      "country_Name": "Vietnam",
      "image": "https://example.com/ha_long_bay.jpg",
      "short_description": "Ha Long Bay is famous for its emerald waters and thousands of towering limestone islands topped with rainforests. It's a UNESCO World Heritage Site and a popular tourist destination for cruises and kayaking.",
    },
    {
      "country_Name": "Cambodia",
      "image": "https://example.com/angkor_wat.jpg",
      "short_description": "Angkor Wat is a massive temple complex in Cambodia and the largest religious monument in the world. It's known for its intricate carvings, grand architecture, and stunning sunrise views.",
    },
   
]

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
    const countriesData=client.db('AsiaExplorerDB').collection('countriesData')
    app.get('/TouristsSpot',async(req,res)=>{
      const cursor=TouristsSpotCollection.find()
      const result =await cursor.toArray()
      res.send(result)
    })
    app.get('/countriesData',async(req,res)=>{
      const cursor=countriesData.find()
      const result =await cursor.toArray()
      res.send(result)
    })
    
    app.post('/TouristsSpot',async(req,res)=>{
      const newSpot=req.body
      console.log(newSpot);
      const result=await TouristsSpotCollection.insertOne(newSpot) 
      res.send(result)
    })
    app.post('/countriesData',async(req,res)=>{
      const newSpot=req.body
      console.log(newSpot);
      const result=await TouristsSpotCollection.insertMany(newSpot) 
      res.send(result)
    })
    
    
     
    app.get('/TouristsSpot/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id:new ObjectId(id)}
      const result=await TouristsSpotCollection.findOne(query)
      res.send(result) 
    })
    app.put('/TouristsSpot/:id',async(req,res)=>{
      const id=req.params.id
      console.log(id);
      const filter={_id:new ObjectId(id)}
      const options={upsert :true}
      const updateSpot=req.body
console.log(updateSpot);
      const spot ={
        $set:{
          tourists_spot_name:updateSpot.tourists_spot_name,
          country_Name:updateSpot.country_Name,
          location:updateSpot.location,
          short_description:updateSpot.short_description,
          average_cost:updateSpot.average_cost,
          seasonality:updateSpot.seasonality,
          travel_time:updateSpot.travel_time,
          totalVisitorsPerYear:updateSpot.totalVisitorsPerYear,
          photo:updateSpot.photo 
        }
      }
      const result=await TouristsSpotCollection.updateOne(filter,spot,options)
      console.log(result);
      res.send(result) 
    })
    app.delete('/TouristsSpot/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id:new ObjectId(id)}
      const result=await TouristsSpotCollection.deleteOne(query)
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