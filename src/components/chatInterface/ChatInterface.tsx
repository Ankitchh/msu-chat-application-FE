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
import { BACKEND_URL } from "../../api/auth";

const ChatInterface = () => {
  const { selectedRoom } = useSelectedRoom();
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

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

  // 🔹 Listen for block/unblock (for BOTH users)
  useEffect(() => {
    const handleBlock = ({ status }: { status: "block" | "unblock" }) => {
      setIsBlocked(status === "block");
    };

    socket.on("block", handleBlock);

    return () => {
      socket.off("block", handleBlock);
    };
  }, []);

  // 🔹 Fetch messages when room changes
  useEffect(() => {
    if (!selectedRoom?.roomId || !token) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/user/messages/${selectedRoom.roomId}`,
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

  // 🔹 Send message (BLOCK ENFORCED)
  const sendMessage = () => {
    if (isBlocked) return;

    const message = inputRef.current?.value.trim();
    if (!message || !selectedRoom || !user) return;

    socket.emit("message", {
      roomId: selectedRoom.roomId,
      message,
      senderId: user.id,
      senderName: user.name,
      createdAt: new Date().toISOString(),
    });

    inputRef.current!.value = "";
  };

  const handleEmojiClick = (emoji: string) => {
    if (!inputRef.current || isBlocked) return;
    inputRef.current.value += emoji;
    inputRef.current.focus();
  };

  if (!selectedRoom) return null;

  return (
    <div className="chat-interface w-[77vw] h-screen bg-[#333657] text-white flex flex-col relative">
      {selectedRoom.type === "single" ? (
        <>
          <ChatInterfaceUserHeader
            isBlocked={isBlocked}
            setIsBlocked={setIsBlocked}
          />
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
            className={`cursor-pointer ${
              isBlocked ? "opacity-40 cursor-not-allowed" : ""
            }`}
            onClick={() => !isBlocked && setShowEmojiPicker((p) => !p)}
          />

          <input
            ref={inputRef}
            type="text"
            disabled={isBlocked}
            placeholder={
              isBlocked ? "You cannot send messages" : "Type a message..."
            }
            className="flex-1 bg-transparent outline-none text-lg disabled:opacity-50"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <SendHorizontal
            strokeWidth={0.75}
            className={`cursor-pointer ${
              isBlocked ? "opacity-40 cursor-not-allowed" : ""
            }`}
            onClick={!isBlocked ? sendMessage : undefined}
          />
        </div>
      </div>

      {/* EMOJI PICKER */}
      {showEmojiPicker && !isBlocked && (
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
