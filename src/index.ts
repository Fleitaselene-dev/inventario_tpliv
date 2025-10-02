import express from "express"

import dotenv from "dotenv"
import { connectDB } from "./db/db.js"
const app = express()
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())
connectDB()


app.listen(PORT, () =>{
    console.log(`Servidor corriendo en puerto: ${PORT}`)
})
