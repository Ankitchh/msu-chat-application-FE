import { SendHorizontal, Smile } from "lucide-react";
import { useRef,useState } from "react";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import ChatBoxUser from "../chatBox/ChatBoxUser";
import ChatBoxGroup from "../chatBox/ChatBoxGroup";
import ChatInterfaceUserHeader from "./ChatInterfaceUserHeader";
import ChatInterfaceGroupHeader from "./ChatInterfaceGroupHeader";
import emojiData from "../../assets/emoji.json";

const ChatInterface = () => {
  const { selectedRoom } = useSelectedRoom();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);


  if (!selectedRoom) return null;

  const sendMessage = async () => {
    const message = inputRef.current?.value.trim();
    if (!message) return;

    try {
      await fetch(
        `https://msu-chat-application.onrender.com/api/v1/user/messages/${selectedRoom.roomId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      inputRef.current!.value = "";
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    if (!inputRef.current) return;

    inputRef.current.value += emoji;
    inputRef.current.focus();
  };


  return (
    <div className="chat-interface w-[77vw] h-screen bg-[#333657] text-white flex flex-col">
      {selectedRoom.type === "single" ? (
        <>
          <ChatInterfaceUserHeader />
          <ChatBoxUser />
        </>
      ) : (
        <>
          <ChatInterfaceGroupHeader />
          <ChatBoxGroup />
        </>
      )}

      {/* INPUT */}
      <div className="h-[11vh] p-2 border-t border-[#484D73]">
        <div className="bg-[#484C6F] h-full rounded-full flex items-center px-4 gap-3">
          <Smile
            strokeWidth={0.75}
            className=" cursor-pointer"
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
      {showEmojiPicker && (
        <div className="absolute scrollbar-hide bottom-[12vh] left-[20vw] w-[320px] max-h-[250px] bg-[#2F3151] rounded-xl p-3 overflow-y-auto shadow-lg">
          {Object.values(emojiData).map((category) => (
            <div key={category.label} className="mb-3">
              <p className="text-sm text-slate-400 mb-1">{category.label}</p>
              <div className="flex flex-wrap gap-2">
                {category.emojis.map((emoji) => (
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
