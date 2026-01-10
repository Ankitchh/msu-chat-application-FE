import { UserRound } from "lucide-react";

import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import type { GroupChatRoom } from "../../contexts/roomContext";
import socket from "../../api/socket";

interface Props {
  rooms: GroupChatRoom[];
}

const SidebarGroupCard = ({ rooms }: Props) => {
  const { setSelectedRoom } = useSelectedRoom();

  return (
    <>
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => {
            socket.emit("joinRoom", { roomId: room.id });

            setSelectedRoom({
              roomId: room.id,
              imageUrl: null,
              name: room.roomName,
              type: "group",
            });
          }}
          className="sidebar-group-list-group-card w-full h-2/12 p-1 hover:bg-[#484D73] border-b border-[#484D73] pb-2"
        >
          <div className="group-card-group-details w-full h-3/4  p-0.5 flex gap-2 items-center">
            <div className="group-card-group-details-avtar w-2/12 h-full  rounded-full flex items-center justify-between">
              <UserRound strokeWidth={0.75} className="w-full h-full" />
              {/* <img
                src={room.}
                alt="User profile"
                className="w-full h-full rounded-full"
              /> */}
            </div>
            <div className="group-card-group-details-name w-7/12 h-full  ">
              <h2 className="w-full h-full flex items-center justify-start pl-1">
                {room.roomName}
              </h2>
            </div>
           
          </div>
         
        </div>
      ))}
    </>
  );
};

export default SidebarGroupCard;
