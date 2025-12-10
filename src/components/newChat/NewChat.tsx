import { ChevronLeft, UserRoundSearch, Users } from "lucide-react";
import NewChatUserlist from "./NewChatUserlist";
import CreateGroup from "../CreateGroup";
import { useState } from "react";

const NewChat = ({ openNewChat, setOpenNewChat }: { openNewChat: string; setOpenNewChat: React.Dispatch<React.SetStateAction<string>> }) => {
  
  const [openCreateGroup, setOpenCreateGroup] =  useState<string>("closed");

  return (
    <>
      <CreateGroup openCreateGroup={openCreateGroup} setOpenCreateGroup={setOpenCreateGroup} />
      <div
        className={`h-screen ${
          openNewChat === "open"
            ? "w-0 overflow-hidden opacity-0"
            : "w-[23vw] p-2 " 
          }  bg-[#333657] text-white border-r border-[#484D73] transition-all duration-500
          ${openCreateGroup === "open" ? "w-0 overflow-hidden opacity-0" : " "}
          `}
      >
        <div className="new-chat w-full h-full p-2  ">
          <div className="new-chat-head w-full h-8 mb-1 flex items-center gap-4 ">
            <button
              onClick={() => {
                setOpenNewChat("open");
              }}
              className="active:text-[#52526b] duration-700 hover:cursor-pointer "
            >
              <ChevronLeft />
            </button>
            <div>new chat</div>
          </div>
          <div className="new-chat-search  w-full h-16 p-1  mb-1">
            <label
              htmlFor="search"
              className="w-full h-full relative flex items-center "
            >
              <input
                type="text"
                placeholder="search user/group..."
                className="w-full border-none bg-[#414568] rounded-full h-3/4 p-1.5 pl-4 focus:outline-none "
              />
              <UserRoundSearch
                strokeWidth={0.75}
                className="absolute right-5"
              />
            </label>
          </div>
          <div onClick={()=>{setOpenCreateGroup("open")}} className="new-chat-group w-full h-8 mb-2 border-b border-gray-400 flex items-center gap-4 pb-4 p-1 active:text-[#52526b] duration-700 hover:cursor-pointer ">
            <div className="active:text-[#52526b] duration-700 hover:cursor-pointer flex items-center ">
              <Users strokeWidth={1} /> <span>+</span>
            </div>
            <div> Create Group</div>
          </div>
          <div className="new-chat-users-list w-full h-[75vh] overflow-auto scrollbar-hide ">
            <NewChatUserlist />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewChat
