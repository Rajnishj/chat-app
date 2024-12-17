import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.json());
app.use(cookieParser())
dotenv.config()
const PORT = process.env.PORT || 5000

app.get("/",(req,res) => {
   res.send("Server is connected with port 8000 hello world Chrome V8 server")
})
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)
app.listen(PORT,()=> {
    connectToMongoDB()
})