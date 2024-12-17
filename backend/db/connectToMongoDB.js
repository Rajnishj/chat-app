import mongoose from "mongoose";

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected to mongo db successfully")
    } catch (error) {
      console.log("Failed to connect mongobd",error.message)  
    }
   
}

export default connectToMongoDB