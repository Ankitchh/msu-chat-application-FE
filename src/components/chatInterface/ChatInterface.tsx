import { SendHorizontal, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import { useUser } from "../../contexts/userContext";
import ChatBoxUser from "../chatBox/ChatBoxUser";
import ChatBoxGroup from "../chatBox/ChatBoxGroup";
import ChatInterfaceUserHeader from "./ChatInterfaceUserHeader";
import ChatInterfaceGroupHeader from "./ChatInterfaceGroupHeader";
import emojiData from "../../assets/emoji.json";
import socket from "../../api/socket";

const ChatInterface = () => {
  const { selectedRoom } = useSelectedRoom();
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const token = localStorage.getItem("token");


 

  // 🔹 Listen for incoming messages
  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);



  // 🔹 Fetch messages when room changes
  useEffect(() => {
    if (!selectedRoom?.roomId || !token) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `https://msu-chat-application.onrender.com/api/v1/user/messages/${selectedRoom.roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setMessages(data.chatRoomMessages || []);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, [selectedRoom?.roomId, token]);

  // 🔹 Send message
 const sendMessage = () => {
   const message = inputRef.current?.value.trim();
   if (!message || !selectedRoom || !user) return;

   socket.emit("message", {
     roomId: selectedRoom.roomId,
     message,
     senderId: user.id,
     senderName: user.name,
   });

   inputRef.current!.value = "";
 };


  const handleEmojiClick = (emoji: string) => {
    if (!inputRef.current) return;
    inputRef.current.value += emoji;
    inputRef.current.focus();
  };

  if (!selectedRoom) return null;

  return (
    <div className="chat-interface w-[77vw] h-screen bg-[#333657] text-white flex flex-col relative">
      {selectedRoom.type === "single" ? (
        <>
          <ChatInterfaceUserHeader />
          <ChatBoxUser messages={messages} />
        </>
      ) : (
        <>
          <ChatInterfaceGroupHeader />
          <ChatBoxGroup messages={messages} />
        </>
      )}

      {/* INPUT */}
      <div className="h-[11vh] p-2 border-t border-[#484D73]">
        <div className="bg-[#484C6F] h-full rounded-full flex items-center px-4 gap-3">
          <Smile
            strokeWidth={0.75}
            className="cursor-pointer"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          />

          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-lg"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <SendHorizontal
            strokeWidth={0.75}
            className="cursor-pointer"
            onClick={sendMessage}
          />
        </div>
      </div>

      {/* EMOJI PICKER */}
      {showEmojiPicker && (
        <div className="absolute scrollbar-hide bottom-[12vh] left-[20vw] w-[320px] max-h-[250px] bg-[#2F3151] rounded-xl p-3 overflow-y-auto shadow-lg">
          {Object.values(emojiData).map((category: any) => (
            <div key={category.label} className="mb-3">
              <p className="text-sm text-slate-400 mb-1">{category.label}</p>
              <div className="flex flex-wrap gap-2">
                {category.emojis.map((emoji: any) => (
                  <button
                    key={emoji.name}
                    className="text-xl hover:bg-[#484C6F] rounded p-1"
                    onClick={() => handleEmojiClick(emoji.symbol)}
                  >
                    {emoji.symbol}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
