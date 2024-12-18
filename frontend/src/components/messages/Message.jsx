import { useAuth } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";


const Message = ({message}) => {
const {authUser} = useAuth()
const { selectedConversation} = useConversation()
const fromMe = message.senderId === authUser._id
const chatClassName = fromMe ? "chat-end" : "chat-start";
const profilePic = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture
const bubbleBgColor = fromMe ? 'bg-blue-500' : ""
const formattedDate = extractTime(message.createdAt)
const shakeClass = message.shouldShake ? 'shake' : ""
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img src={profilePic} alt='Tailwind CSS chat bubble component'  />
				</div>
			</div>
			<div className={`chat-bubble text-white pb-2 ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer text-white opacity-50 text-xs flex gap-1 items-center'>{formattedDate}</div>
		</div>
	);
};
export default Message;