import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
  
    const sendMessage = async (message, fileInputValue) => {
      setLoading(true);
      try {
        // Construct FormData
        const formData = new FormData();
        formData.append("message", message);
  
        // Append the file only if it exists
        if (fileInputValue) {
          formData.append("image", fileInputValue);
        }
  
        const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
          method: "POST",
          body: formData, // Use FormData
        });
  
        const data = await res.json();
        if (data.senderId) {
          setMessages([...messages, data]); // Update messages
        } else {
          toast.error(data.err);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, sendMessage };
  };
  
  export default useSendMessage