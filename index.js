const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config

const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://formdb:cHpWuJRLE4ofqklR@cluster0.lzm3u.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
      await client.connect()
      const database = client.db('formdb')
      const fromCollection = database.collection('users')
      
      //GET API for showing users from db
      app.get('/users', async(req,res)=>{
        const cursor = fromCollection.find({})
        const users = await cursor.toArray()
        res.send(users)
      })

      //POST API for posting users into db
      app.post('/users', async(req,res)=>{
        const newUser = req.body
        // console.log(newUser)
        const result = await fromCollection.insertOne(newUser)
        res.json(result)
      })



  }
  finally {
    // await client.close()
}
}
run().catch(console.dir)



app.get("/", (req, res) => {
    res.send("Running Xponent form server");
  });
  
  app.listen(port, () => {
    console.log("Running server on port", port);
  });


