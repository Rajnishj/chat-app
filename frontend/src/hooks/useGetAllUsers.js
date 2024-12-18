import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const fetchAllUsers = async () => {
    setLoading(true)
    try {
        const res = await fetch('/api/users')
        const data = await res.json()
        if(data?.err){
            toast.error(data?.err)
        }else{
            setConversations(data?.data)
        }
    } catch (error) {
        toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchAllUsers()
  },[])

  return {loading,conversations}
};

export default useGetAllUsers;
