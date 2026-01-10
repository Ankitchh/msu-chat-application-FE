import { UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import { useUser } from "../../contexts/userContext";

const ChatBoxGroup = () => {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const { selectedRoom } = useSelectedRoom();
  const { user } = useUser();

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 Fetch group messages (SAME API)
  useEffect(() => {
    if (!selectedRoom?.roomId || !token) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://msu-chat-application.onrender.com/api/v1/user/messages/${selectedRoom.roomId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setMessages(data.chatRoomMessages || []);
      } catch (err) {
        console.error("Failed to fetch group messages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedRoom?.roomId, token]);

  // 🔽 Auto-scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  if (!selectedRoom) return null;

  return (
    <div
      ref={chatRef}
      className="chat-interface-chatbox w-full h-[78vh] flex flex-col gap-2 overflow-y-auto mb-2 px-6 scrollbar-hide"
    >
      {loading && (
        <p className="text-center text-gray-400 text-sm">Loading...</p>
      )}

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
                <UserRound
                  strokeWidth={0.75}
                  className="w-full h-full rounded-full bg-[#414568]"
                />
              </div>
            )}

            <div className="max-w-[60%]">
              {/* Sender name (only for received) */}
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
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBoxGroup;
