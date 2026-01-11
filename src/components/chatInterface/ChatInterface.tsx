import { SendHorizontal, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import { useUser } from "../../contexts/userContext";
import { useRoomContext } from "../../contexts/roomContext";
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
  const { singleChatRoom } = useRoomContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); // Current user blocked the other user
  const [isBlockedByOther, setIsBlockedByOther] = useState(false); // Other user blocked current user

  const token = localStorage.getItem("token");

  // Find the current room data
  const currentRoomData = singleChatRoom.find(
    (room) => room.id === selectedRoom?.roomId
  );

  // Get other user's ID
  const otherUserId =
    currentRoomData && user
      ? currentRoomData.senderId === user.id
        ? currentRoomData.receiverId
        : currentRoomData.senderId
      : null;

  // Get block status from room data
  const getBlockStatusFromRoom = () => {
    if (!currentRoomData || !user || !otherUserId) {
      return { isBlocked: false, isBlockedByOther: false };
    }

    const blockedField = currentRoomData.blocked;

    // If no one is blocked
    if (!blockedField) {
      return { isBlocked: false, isBlockedByOther: false };
    }

    // Check if current user is blocked
    if (blockedField === user.id) {
      return { isBlocked: false, isBlockedByOther: true };
    }

    // Check if current user blocked the other user
    if (blockedField === otherUserId) {
      return { isBlocked: true, isBlockedByOther: false };
    }

    // Check partial matches (in case of partial IDs)
    if (otherUserId && blockedField.includes(otherUserId)) {
      return { isBlocked: true, isBlockedByOther: false };
    }

    if (blockedField.includes(user.id)) {
      return { isBlocked: false, isBlockedByOther: true };
    }

    return { isBlocked: false, isBlockedByOther: false };
  };

  // 🔹 Listen for incoming messages
  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  // 🔹 Listen for block/unblock events from socket - UPDATED for new format
  useEffect(() => {
    const handleBlock = (data: any) => {
      console.log("Block socket event:", data);

      const status = data.status; // true for block, false for unblock
      const blockedUserId = data.userId; // string ID of blocked user

      console.log("Parsed:", {
        status: status ? "block" : "unblock",
        blockedUserId,
        currentUserId: user?.id,
        otherUserId,
      });

      if (!user || !blockedUserId) return;

      // Determine who blocked whom
      if (blockedUserId === user.id) {
        // Current user was blocked/unblocked by someone else
        setIsBlockedByOther(status); // true if blocked, false if unblocked
        setIsBlocked(false); // Ensure this is false
        console.log(
          "Current user was",
          status ? "blocked by" : "unblocked by",
          "someone else"
        );
      } else if (blockedUserId === otherUserId) {
        // Current user blocked/unblocked someone else
        setIsBlocked(status); // true if blocked, false if unblocked
        setIsBlockedByOther(false); // Ensure this is false
        console.log(
          "Current user",
          status ? "blocked" : "unblocked",
          "someone else"
        );
      }
    };

    socket.on("block", handleBlock);

    return () => {
      socket.off("block", handleBlock);
    };
  }, [user, otherUserId]);

  // 🔹 Fetch messages and update block status when room changes
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

    // Update block status from room data
    if (selectedRoom.type === "single" && currentRoomData && user) {
      const { isBlocked: blockedStatus, isBlockedByOther: blockedByOther } =
        getBlockStatusFromRoom();

      console.log("Initial block status from room:", {
        blockedStatus,
        blockedByOther,
        roomId: selectedRoom.roomId,
        blockedField: currentRoomData.blocked,
      });

      setIsBlocked(blockedStatus);
      setIsBlockedByOther(blockedByOther);
    } else {
      setIsBlocked(false);
      setIsBlockedByOther(false);
    }
  }, [selectedRoom?.roomId, token, currentRoomData, user]);

  // 🔹 Update block status when room data changes
  useEffect(() => {
    if (selectedRoom?.type === "single" && currentRoomData && user) {
      const { isBlocked: blockedStatus, isBlockedByOther: blockedByOther } =
        getBlockStatusFromRoom();

      // Update if values changed
      if (blockedStatus !== isBlocked || blockedByOther !== isBlockedByOther) {
        console.log("Updating from room data:", {
          blockedStatus,
          blockedByOther,
          previous: { isBlocked, isBlockedByOther },
        });

        setIsBlocked(blockedStatus);
        setIsBlockedByOther(blockedByOther);
      }
    }
  }, [currentRoomData, user, selectedRoom?.type]);

  // 🔹 Send message (with block check)
  const sendMessage = () => {
    // Determine if messaging is disabled based on your conditions
    const isMessagingDisabled = isBlocked || isBlockedByOther;

    if (isMessagingDisabled) {
      console.log("Cannot send message - blocked");
      return;
    }

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
    // Determine if messaging is disabled
    const isMessagingDisabled = isBlocked || isBlockedByOther;

    if (!inputRef.current || isMessagingDisabled) return;
    inputRef.current.value += emoji;
    inputRef.current.focus();
  };

  if (!selectedRoom) return null;

  // Determine messaging status based on your conditions
  const isMessagingDisabled = isBlocked || isBlockedByOther;

  // Create appropriate message
  let blockedMessage = "Messaging is disabled";
  if (isBlocked && !isBlockedByOther) {
    blockedMessage = "You have blocked this user";
  } else if (!isBlocked && isBlockedByOther) {
    blockedMessage = "This user has blocked you";
  } else if (isBlocked && isBlockedByOther) {
    blockedMessage = "Both users have blocked each other";
  }

  return (
    <div className="chat-interface w-[77vw] h-screen bg-[#333657] text-white flex flex-col relative">
      {selectedRoom.type === "single" ? (
        <>
          <ChatInterfaceUserHeader
            isBlocked={isBlocked}
            setIsBlocked={setIsBlocked}
            isBlockedByOther={isBlockedByOther}
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
              isMessagingDisabled ? "opacity-40 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              !isMessagingDisabled && setShowEmojiPicker((p) => !p)
            }
          />

          <input
            ref={inputRef}
            type="text"
            disabled={isMessagingDisabled}
            placeholder={
              isMessagingDisabled ? blockedMessage : "Type a message..."
            }
            className="flex-1 bg-transparent outline-none text-lg disabled:opacity-50"
            onKeyDown={(e) =>
              e.key === "Enter" && !isMessagingDisabled && sendMessage()
            }
          />

          <SendHorizontal
            strokeWidth={0.75}
            className={`cursor-pointer ${
              isMessagingDisabled ? "opacity-40 cursor-not-allowed" : ""
            }`}
            onClick={!isMessagingDisabled ? sendMessage : undefined}
          />
        </div>
      </div>

      {/* EMOJI PICKER */}
      {showEmojiPicker && !isMessagingDisabled && (
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
