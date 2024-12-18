import useGetAllUsers from "../../hooks/useGetAllUsers";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
import ShimmerConversation from "./ShimmerConversation";

const Conversations = () => {
  const { loading, conversations } = useGetAllUsers();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? <ShimmerConversation /> : null}
    </div>
  );
};
export default Conversations;
