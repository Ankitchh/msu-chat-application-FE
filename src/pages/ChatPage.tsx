import ChatInterface from "../components/chatInterface/ChatInterface";
import Sidebar from "../components/sidebar/Sidebar";
import { useSelectedRoom } from "../contexts/selectedRoomContext";

const ChatPage = () => {
  const { selectedRoom } = useSelectedRoom();

  return (
    <div>
      <div className="chatpage w-Screen h-Screen flex bg-[#333657]">
        <Sidebar />
        {selectedRoom === null ? (
          <div className="Defult-Page w-[77vw] h-screen flex justify-center items-center text-slate-400 flex-col gap-5 ">
            <img
              src="./public/logo.svg"
              alt="msu-logo"
              className="w-40 h-40 opacity-45"
            />
            <h1 className="text-5xl">Start new chat</h1>
          </div>
        ) : (
          <ChatInterface />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
