import { SendHorizontal, Smile } from "lucide-react";
import ChatInterfaceUserHeader from "../ChatInterfaceUserHeader";
import ChatBoxUser from "../chatBox/ChatBoxUser";
import ChatBoxGroup from "../chatBox/ChatBoxGroup";
import ChatInterfaceGroupHeader from "./ChatInterfaceGroupHeader";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";

const ChatInterface = () => {
  const { selectedRoom } = useSelectedRoom();

  if (selectedRoom === null) {
    return <div></div>;
  }

  return (
    <div className="chat-interface w-[77vw] h-screen bg-[#333657] text-white">
      {selectedRoom.type === "single" ? (
        <>
          <ChatInterfaceUserHeader />
          <ChatBoxUser />{" "}
        </>
      ) : (
        <>
          <ChatInterfaceGroupHeader />
          <ChatBoxGroup />
        </>
      )}
      <div className="chat-interface-input-div w-full h-[11vh] p-1 flex items-center justify-center border-t border-[#484D73] ">
        <div className="chat-interface-input-section w-[97%] bg-[#484C6F] h-[90%] rounded-full flex items-center justify-between p-3 my-2 ">
          <div className="chat-interface-input-emojis text-slate-400 w-[4%] h-full flex items-center justify-center">
            <Smile strokeWidth={0.75} className="w-[65%] h-full" />
          </div>
          <div className="chat-interface-input  w-[85%] h-full flex items-center text-lg">
            <input
              className="w-full h-full border-none p-3  focus:outline-none"
              type="text"
              placeholder="Type a message..."
            />
          </div>
          <div className="chat-interface-input-send  w-[7%] h-full flex items-center justify-center">
            <SendHorizontal strokeWidth={0.75} className="w-[50%] h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
