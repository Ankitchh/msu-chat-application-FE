import { UserRound } from "lucide-react";
import { useEffect, useRef } from "react";

const ChatBoxGroup = () => {
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  return (
    <div
      ref={chatRef}
      id="chatBox"
      className="chat-interface-chatbox w-full h-[78vh] flex flex-col gap-2 overflow-y-auto mb-2 scrollbar-hide"
    >
      {/* reciveing message */}
      <div className="chat-interface-chatbox-recived w-full px-8 my-3 text-sm flex justify-start">
        <div className="recivd-avtar w-5 h-5  rounded-full flex items-center justify-between mr-1">
          {/* <UserRound strokeWidth={0.75} className="w-full h-full" /> */}
          <img
            src="https://avatars.githubusercontent.com/u/64682052?v=4"
            alt="User profile"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="chat-interface-chatbox-recived-messageTime max-w-5/12">
          <div className="chat-interface-chatbox-recived-from mb-1 pt-1">
            <h4 className="text-xs">Amit Bhagat</h4>
          </div>
          <div className="chat-interface-chatbox-recived-message w-fit bg-[#4B4B6D] p-4 rounded-t-2xl rounded-r-2xl">
            <h3>Hello guys ...
            </h3>
          </div>
          <div className="text-xs mt-1 text-slate-400">
            <h4>2min ago</h4>
          </div>
        </div>
      </div>

      <div className="chat-interface-chatbox-recived w-full px-8 my-3 text-sm flex justify-start">
        <div className="recivd-avtar w-5 h-5  rounded-full flex items-center justify-between mr-1">
          <UserRound strokeWidth={0.75} className="w-full h-full bg-amber-700 rounded-full" />
          {/* <img
            src="https://avatars.githubusercontent.com/u/64682052?v=4"
            alt="User profile"
            className="w-full h-full rounded-full"
          /> */}
        </div>
        <div className="chat-interface-chatbox-recived-messageTime max-w-5/12">
          <div className="chat-interface-chatbox-recived-from mb-1 pt-1">
            <h4 className="text-xs"> +91 1234567890</h4>
          </div>
          <div className="chat-interface-chatbox-recived-message w-fit bg-[#4B4B6D] p-4 rounded-t-2xl rounded-r-2xl">
            <h3>Hi there! ...
            </h3>
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

export default ChatBoxGroup;
