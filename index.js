const express = require("express")
require('dotenv').config()
const cors = require('cors')
require('./config/connection')
const router = require("./routes/router")

const cookpediaServer = express()

cookpediaServer.use(cors())
cookpediaServer.use(express.json())
cookpediaServer.use(router)

const PORT = 3000 || process.env.PORT

cookpediaServer.listen(PORT,()=>{
    console.log(`Cookpedia Server started at port : ${PORT}`);
    
})

cookpediaServer.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:red;">Cookpedia Server started</h1>`)
})