import { useEffect, useRef } from "react";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";

const ChatBoxUser = () => {
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  const { selectedRoom } = useSelectedRoom();
  if (selectedRoom === null) {
    return <div></div>;
  }

  return (
    <div
      ref={chatRef}
      id="chatBox"
      className="chat-interface-chatbox w-full h-[78vh] flex flex-col gap-2 overflow-y-auto mb-2 scrollbar-hide"
    >
      {/* reciveing message */}
      <div className="chat-interface-chatbox-recived w-full px-8 my-3 text-sm flex justify-start">
        <div className="chat-interface-chatbox-recived-messageTime max-w-5/12">
          <div className="chat-interface-chatbox-recived-message w-fit bg-[#4B4B6D] p-4 rounded-t-2xl rounded-r-2xl">
            <h3>Hi there! ...</h3>
          </div>
          <div className="text-xs mt-1 text-slate-400">
            <h4>2min ago</h4>
          </div>
        </div>
      </div>

      {/* sending message */}
      <div className="chat-interface-chatbox-sent w-full px-8 my-3 text-sm flex justify-end">
        <div className="chat-interface-chatbox-sent-messageTime max-w-5/12">
          <div className="chat-interface-chatbox-sent-message w-fit bg-[#9B96FE] p-4 rounded-t-2xl rounded-l-2xl">
            <h3>Hi there! ...</h3>
          </div>
          <div className="text-xs mt-1 text-slate-400 flex justify-end">
            <h4>2min ago</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxUser;
