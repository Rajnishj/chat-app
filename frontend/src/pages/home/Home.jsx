import { useEffect } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen max-sm:h-[640px] flex flex-col md:flex-row md:h-[640px] overflow-y-auto max-sm:overflow-scroll">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;