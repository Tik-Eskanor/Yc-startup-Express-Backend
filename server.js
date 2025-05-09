require('dotenv').config()
const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose')
const authorRoute = require('./Routes/author-routes')
const startupRoute = require('./Routes/startup-routes')
const authRoute = require('./Routes/auth-routes')

const app = express()
// app.use(
//     cors({
//       origin: "http://localhost:3000", // Allow Next.js frontend
//       methods: ["GET", "POST", "OPTIONS"], // Include OPTIONS for preflight
//       allowedHeaders: ["Content-Type", "Authorization"], // Allow headers
//       credentials: true, // Allow cookies if needed
//     })
//   );
  

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('Database connected'))
.catch(e => console.log(e))

// middleware
app.use(express.json())

app.use('/api/author',authorRoute)
app.use('/api/startup',startupRoute)
app.use('/api/auth',authRoute)

app.listen(process.env.PORT,()=>{
    console.log("Server is running")
})