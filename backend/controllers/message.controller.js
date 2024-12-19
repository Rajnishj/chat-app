import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getRecieverSocketId, io } from "../socket/socket.js"
import { convertImageToInCloudnary } from "../utils/validation.js"

export const sendMessage = async(req,res)=> {
   try {
    const { message } = req.body
    const file = req.file; 
    const {id:recieverId} = req.params
    const senderId = req.user._id

    let cloudResponse;
    if (file) {
      try {
        cloudResponse = await convertImageToInCloudnary(file);
      } catch (error) {
        console.error("Cloudinary upload error:", error);
      }
    }

    let conversation = await Conversation.findOne({
        participants: {$all:[senderId,recieverId]}
    })
    if(!conversation){
        conversation = await Conversation.create({
            participants:[senderId,recieverId]
        })
    }
    const newMessage = new Message({
        senderId,
        recieverId,
        message,
        image: cloudResponse?.secure_url
    })
    if(newMessage){
        conversation.message.push(newMessage._id)
    }
    await Promise.all([conversation.save(),newMessage.save()])

    const recieverSocketId = getRecieverSocketId(recieverId)
    if(recieverSocketId){
        //io.to(<socket_id).emit() used to send events to specific client
        io.to(recieverSocketId).emit("newMessage",newMessage)
    }
    res.status(201).json(newMessage)

   } catch (error) {
    res.status(500).json({
        err:"Internal server Error",
        error: error.message
    })
   }
}

export const getMessage = async(req,res) => {
    try {
      const { id: userToChatId} = req.params  
      const senderId = req.user._id
      const conversation = await Conversation.findOne({
        participants:{$all:[senderId,userToChatId]}
      }).populate('message')
      if(!conversation) return res.status(200).json([])

        const messages = conversation.message
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({
            err:"Internal server Error",
            error: error.message
        })
       }
}