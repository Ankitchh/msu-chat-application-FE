import { Ellipsis, UserRound } from "lucide-react";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";

const ChatInterfaceGroupHeader = () => {
  const { selectedRoom } = useSelectedRoom();
  if (selectedRoom === null) {
    return <div></div>;
  }

  return (
    <div className="chat-interface-header w-full h-[10vh]  flex items-center justify-between border-b border-[#484D73]">
      <div className="chat-interface-header-user-detals w-1/4 h-full  flex items-center gap-3">
        <div className="chat-interface-headeruser-details-avtar relative w-[24%] h-full p-2  rounded-full flex items-center justify-between">
          <UserRound strokeWidth={0.75} className="w-full h-full" />
          {/* <img
            src="https://avatars.githubusercontent.com/u/64682052?v=4"
            alt="User profile"
            className="w-full h-full rounded-full"
          /> */}
        </div>
        <div className="chat-interface-header-user-name-status">
          <div className="chat-interface-header-user-name">
            <h1 className="text-xl">{selectedRoom.name}</h1>
          </div>
          {/* <div className="chat-interface-header-user-status">
            <h2 className="text-sm text-slate-400">Active Now</h2>
          </div> */}
        </div>
      </div>
      <div className="chat-interface-header-user-options w-1/4 h-full  flex justify-end items-center pr-3 ">
        <Ellipsis strokeWidth={2} className="hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatInterfaceGroupHeader;
