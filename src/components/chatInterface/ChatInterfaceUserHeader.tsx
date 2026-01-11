import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import { useUser } from "../../contexts/userContext";
import { useRoomContext } from "../../contexts/roomContext";
import socket from "../../api/socket";

interface ChatInterfaceUserHeaderProps {
  isBlocked: boolean; // Current user blocked the other user
  setIsBlocked: React.Dispatch<React.SetStateAction<boolean>>;
  isBlockedByOther: boolean; // Other user blocked current user
}

const ChatInterfaceUserHeader = ({
  isBlocked,
  setIsBlocked,
  isBlockedByOther,
}: ChatInterfaceUserHeaderProps) => {
  const { selectedRoom } = useSelectedRoom();
  const { user } = useUser();
  const { singleChatRoom } = useRoomContext();
  const [showMenu, setShowMenu] = useState(false);

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

  if (!selectedRoom || !user || !currentRoomData || !otherUserId)
    return <div />;

  const handleBlockToggle = () => {
    if (selectedRoom.type !== "single") return;

    // Determine new status
    const newStatus = !isBlocked; // true for block, false for unblock

    console.log("Emitting block event:", {
      roomId: selectedRoom.roomId,
      status: newStatus,
      userId: otherUserId,
    });

    socket.emit("block", {
      roomId: selectedRoom.roomId,
      status: newStatus,
      userId: otherUserId,
    });

    // Immediately update local state for responsive UI
    setIsBlocked(newStatus);
    setShowMenu(false);
  };

  // Determine if block button should be shown based on your conditions:
  // 1. If isBlockedByOther is true and isBlocked is false → hide button
  // 2. If isBlockedByOther is false and isBlocked is true → show unblock option
  const shouldShowBlockButton = !isBlockedByOther;
  const buttonText = isBlocked ? "Unblock" : "Block";
  const buttonColor = isBlocked ? "text-green-400" : "text-red-400";

  return (
    <div className="chat-interface-header w-full h-[10vh] flex items-center justify-between border-b border-[#484D73]">
      {/* LEFT */}
      <div className="flex items-center gap-3 pl-2">
        <img
          src={
            selectedRoom.imageUrl ??
            "https://avatars.githubusercontent.com/u/64682052?v=4"
          }
          className="w-12 h-12 rounded-full"
          alt={selectedRoom.name}
        />
        <div>
          <h1 className="text-xl">{selectedRoom.name}</h1>
          <h2 className="text-sm text-slate-400">
            {isBlocked || isBlockedByOther ? "Blocked" : "typing..."}
          </h2>
        </div>
      </div>

      {/* RIGHT - Only show block menu if user is not blocked by other */}
      <div className="relative px-4">
        {shouldShowBlockButton && (
          <>
            <button onClick={() => setShowMenu(!showMenu)}>
              <Ellipsis />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-[#414568] rounded shadow-xl z-50">
                <button
                  onClick={handleBlockToggle}
                  className={`w-full px-3 py-2 text-left hover:bg-[#52526b] ${buttonColor}`}
                >
                  {buttonText}
                </button>
              </div>
            )}
          </>
        )}

        {/* Show message if blocked by other user */}
        {isBlockedByOther && !isBlocked && (
          <div className="text-sm text-red-400 italic">
            User has blocked you
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterfaceUserHeader;
