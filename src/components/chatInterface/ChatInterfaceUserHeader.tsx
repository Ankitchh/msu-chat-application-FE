import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import { useUser } from "../../contexts/userContext";
import socket from "../../api/socket";

const ChatInterfaceUserHeader = ({
  isBlocked,
  setIsBlocked,
}: {
  isBlocked: boolean;
  setIsBlocked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { selectedRoom } = useSelectedRoom();
  const { user } = useUser();

  const [showMenu, setShowMenu] = useState(false);

  if (!selectedRoom || !user) return <div />;

  const handleBlockToggle = () => {
    if (selectedRoom.type !== "single") return;

    socket.emit("block", {
      roomId: selectedRoom.roomId,
      status: isBlocked ? "unblock" : "block",
    });

    setIsBlocked(!isBlocked);
    setShowMenu(false);
  };

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
        />
        <div>
          <h1 className="text-xl">{selectedRoom.name}</h1>
          <h2 className="text-sm text-slate-400">
            {isBlocked ? "Blocked" : "typing..."}
          </h2>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative px-4">
        <button onClick={() => setShowMenu(!showMenu)}>
          <Ellipsis />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-[#414568] rounded shadow-xl z-50">
            <button
              onClick={handleBlockToggle}
              className={`w-full px-3 py-2 text-left hover:bg-[#52526b] ${
                isBlocked ? "text-green-400" : "text-red-400"
              }`}
            >
              {isBlocked ? "Unblock" : "Block"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterfaceUserHeader;
