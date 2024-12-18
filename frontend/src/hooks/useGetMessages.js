import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages,setMessages,selectedConversation } = useConversation();

  const fetchAllMessages = async() => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages/${selectedConversation._id}`)  
      const data = await res.json()
      if(data.err){
        toast.error(data.err)
      }else{
        setMessages(data)
      }
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false)
    }
  }
  useEffect(() => {
    if(selectedConversation?._id) fetchAllMessages()
  },[selectedConversation?._id,setMessages])

  return {loading , messages}
}

export default useGetMessages
