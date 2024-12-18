import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageShimmer from "./MessageShimmer";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
	const { loading , messages} = useGetMessages()
	useListenMessage()
	const lastMessageRef = useRef()
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
		},0)
	},[messages])
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef} >
						<Message message={message} />
					</div>
				))}

			{loading && <MessageShimmer />}
			{!loading && messages.length === 0 && (
				<p className='text-center text-white'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;