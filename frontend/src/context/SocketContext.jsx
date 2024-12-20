import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import io from 'socket.io-client'

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket , setSocket ] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    const { authUser } = useAuth()
    useEffect(() => {
        if(authUser){
        //    const socket = io('http://localhost:5000',{
        //     query:  {
        //         userId: authUser._id,
        //     },
        //    })
        const socket = io('https://chat-app-rsij.onrender.com',{
            query:  {
                userId: authUser._id,
            },
           })
            setSocket(socket)
            socket.on("getOnlineUsers",(users) => {
                setOnlineUsers(users)
            })
            return () => socket.close()
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authUser])
  return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>;
};


export const useSocketContext = () => {
  return useContext(SocketContext);
};