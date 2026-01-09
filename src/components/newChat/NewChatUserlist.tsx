import type { SingleChatRoom } from "../../contexts/roomContext";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import { useUser } from "../../contexts/userContext";

interface Props {
  rooms: SingleChatRoom[];
}

const NewChatUserlist = ({ rooms }: Props) => {
  const { setSelectedRoom } = useSelectedRoom();
  const { user } = useUser();

  const openRoom = (roomId: string, imageUrl: string, name: string) => {
    setSelectedRoom({ roomId, imageUrl, name, type: "single" });
  };

  return (
    <>
      {rooms.map((room) => {
        const isReceiver = user?.name === room.receiver.name;
        const name = isReceiver ? room.sender.name : room.receiver.name;
        const imageUrl = isReceiver
          ? room.sender.imageUrl
          : room.receiver.imageUrl;

        return (
          <div
            key={room.id}
            onClick={() => openRoom(room.id, imageUrl, name)}
            className="new-chat-user-list-user-card w-full h-15 p-1 hover:bg-[#484D73] border-b border-[#484D73]"
          >
            <div className="user-card-user-details w-full h-3/4 p-0.5 flex gap-2 items-center">
              <div className="w-2/12 h-full rounded-full flex items-center">
                <img
                  src={imageUrl}
                  alt="User profile"
                  className="w-3/4 h-3/4 rounded-full"
                />
              </div>

              <div className="w-7/12 h-full">
                <h2 className="w-full h-full flex items-center pl-1 text-sm">
                  {name}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NewChatUserlist;
