import { UserRound } from "lucide-react";
import { useEffect, useRef } from "react";
import { useUser } from "../../contexts/userContext";

const ChatBoxGroup = ({ messages }: { messages: any[] }) => {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  

  return (
    <div
      ref={chatRef}
      className="w-full h-[78vh] flex flex-col gap-2 overflow-y-auto mb-2 px-6 scrollbar-hide"
    >
      {messages.map((msg) => {
        const isSender = msg.senderId === user?.id;

        return (
          <div
            key={msg.id}
            className={`w-full flex ${
              isSender ? "justify-end" : "justify-start"
            }`}
          >
            {!isSender && (
              <div className="w-6 h-6 mr-2 mt-2">
                <UserRound className="w-full h-full rounded-full bg-[#414568]" />
              </div>
            )}

            <div className="max-w-[60%]">
              {!isSender && (
                <p className="text-xs text-gray-400 mb-1">{msg.senderName}</p>
              )}

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
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBoxGroup;
