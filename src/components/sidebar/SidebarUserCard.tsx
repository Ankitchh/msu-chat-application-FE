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

  const openRoom = (room: SingleChatRoom) => {
    const roomId = room.id;

    // Determine the other user
    const otherUserId =
      user?.id === room.senderId ? room.receiverId : room.senderId;
    const otherUserName =
      user?.name === room.receiver.name ? room.sender.name : room.receiver.name;
    const otherUserImage =
      user?.name === room.receiver.name
        ? room.sender.imageUrl
        : room.receiver.imageUrl;

    // ✅ join socket room
    socket.emit("joinRoom", { roomId });

    // ✅ update app state with all necessary info
    setSelectedRoom({
      roomId,
      imageUrl: otherUserImage,
      name: otherUserName,
      type: "single",
      otherUserId: otherUserId,
      roomData: room, // Store full room data if needed
    });
  };

  return (
    <>
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => openRoom(room)}
          className="sidebar-user-list-user-card w-full h-2/12 p-1 hover:bg-[#484D73] border-b border-[#484D73] pb-2"
        >
          <div className="user-card-user-details w-full h-3/4  p-0.5 flex gap-2 items-center">
            <div className="user-card-user-details-avtar w-2/12 h-full  rounded-full flex items-center justify-between">
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
