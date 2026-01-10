import { useEffect, useRef } from "react";
import { useUser } from "../../contexts/userContext";

const ChatBoxUser = ({ messages }: { messages: any[] }) => {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();

  // 🔽 Auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide"
    >
      {messages.map((msg) => {
        const isSender = msg.senderId === user?.id;

        return (
          <div
            key={msg.id}
            className={`w-full flex mb-3 ${
              isSender ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-[60%]">
              <div
                className={`p-3 text-sm rounded-2xl ${
                  isSender
                    ? "bg-[#9B96FE] rounded-l-2xl"
                    : "bg-[#4B4B6D] rounded-r-2xl"
                }`}
              >
                {msg.message}
              </div>

              <div
                className={`text-xs mt-1 text-slate-400 ${
                  isSender ? "text-right" : "text-left"
                }`}
              >
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBoxUser;
