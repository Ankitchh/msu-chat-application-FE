import { useEffect, useRef, useState } from "react";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import { useUser } from "../../contexts/userContext";

const ChatBoxUser = () => {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const { selectedRoom } = useSelectedRoom();
  const { user } = useUser();

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

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
        console.error("Failed to fetch messages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedRoom?.roomId, token]);

  // 🔽 Auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  if (!selectedRoom) return null;

  return (
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide"
    >
      {loading && (
        <p className="text-center text-gray-400 text-sm">Loading...</p>
      )}

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
