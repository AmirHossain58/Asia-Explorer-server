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
      "image": "https://i.ibb.co/FWtqQC9/6613.jpg",
      "short_description": "Cox's Bazar is the longest natural sea beach in the world. It offers stunning sunsets, water sports, and beachside activities.",
     
    },
    {
      "country_Name": "Thailand",
      "image": "https://i.ibb.co/5cG1shy/786.jpg",
      "short_description": "Chiang Mai is a city in northern Thailand known for its beautiful temples, vibrant markets, and lush mountains.",
  
    },
    {
      "country_Name": "Indonesia",
      "image": "https://i.ibb.co/jwCN7Wp/390.jpg",
      "short_description": "Bali is a tropical paradise known for its stunning beaches, lush rice terraces, and vibrant culture.",
    },
    {
      "country_Name": "Malaysia",
      "image": "https://i.ibb.co/T19ZCq5/9949.jpg",
      "short_description": "Kuala Lumpur is the capital city of Malaysia known for its modern skyscrapers, cultural landmarks, and vibrant street food scene.",
    },
    {
      "country_Name": "Vietnam",
      "image": "https://i.ibb.co/TYFCVXc/licensed-image.jpg",
      "short_description": "Ha Long Bay is famous for its emerald waters and thousands of towering limestone islands topped with rainforests. It's a UNESCO World Heritage Site and a popular tourist destination for cruises and kayaking.",
    },
    {
      "country_Name": "Cambodia",
      "image": "https://i.ibb.co/bR1kW9B/download.jpg",
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
    app.get('/countriesData',(req,res)=>{
   
      res.send(countriesDataAll)
    })
    
    
    app.post('/countriesData',async(req,res)=>{
      const newSpot=countriesDataAll
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