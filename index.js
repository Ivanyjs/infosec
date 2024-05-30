//Main index file, handles files.

//Dependencies
const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('./config.json')
const auth = require("./auth.js")

//Things, main variables, etc.
const app = express();
const port = config.port
const uri = config.db

app.use(express.json())

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

app.use("/auth", auth.app) //Authentication Code.
