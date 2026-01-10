// import { UserRound } from "lucide-react";
import type { SingleChatRoom } from "../../contexts/roomContext";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import { useUser } from "../../contexts/userContext";
import socket from "../../api/socket";

interface Props {
  rooms: SingleChatRoom[];
}

const SidebarUserCard = ({ rooms }: Props) => {
  const { setSelectedRoom } = useSelectedRoom();
  const { user } = useUser();

  const openRoom = (roomId: string, imageUrl: string, name: string) => {
    // ✅ join socket room
    socket.emit("joinRoom", { roomId });

    // ✅ update app state
    setSelectedRoom({ roomId, imageUrl, name, type: "single" });
  };
  return (
    <>
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() =>
            openRoom(
              room.id,
              user?.name === room.receiver.name
                ? room.sender.imageUrl
                : room.receiver.imageUrl,
              user?.name === room.receiver.name
                ? room.sender.name
                : room.receiver.name
            )
          }
          className="sidebar-user-list-user-card w-full h-2/12 p-1 hover:bg-[#484D73] border-b border-[#484D73] pb-2"
        >
          <div className="user-card-user-details w-full h-3/4  p-0.5 flex gap-2 items-center">
            <div className="user-card-user-details-avtar w-2/12 h-full  rounded-full flex items-center justify-between">
              {/* <UserRound strokeWidth={0.75} className="w-full h-full" /> */}
              <img
                src={
                  user?.name === room.receiver.name
                    ? room.sender.imageUrl
                    : room.receiver.imageUrl
                }
                alt="User profile"
                className="w-full h-full rounded-full"
              />
            </div>

            <div className="user-card-user-details-name w-7/12 h-full  ">
              <h2 className="w-full h-full flex items-center justify-start pl-1">
                {user?.name === room.receiver.name
                  ? room.sender.name
                  : room.receiver.name}
              </h2>
            </div>
           
          </div>
        
        </div>
      ))}
    </>
  );
};

export default SidebarUserCard;
