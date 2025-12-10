import { UserRoundSearch } from "lucide-react";
import SidebarUserCard from "./SidebarUserCard";
import SidebarGroupCard from "./SidebarGroupCard";
import NewChat from "../newChat/NewChat";
import { useState } from "react";

const Sidebar = () => {
  const [openNewChat, setOpenNewChat] = useState<string>("open");

  return (
    <>
      <NewChat openNewChat={openNewChat} setOpenNewChat={setOpenNewChat} />
      <div
        className={`h-screen  ${
          openNewChat === "open"
            ? "w-[23vw] p-2"
            : "w-0 overflow-hidden opacity-0"
        } transition-all duration-500 bg-[#333657]  text-white border-r border-[#484D73]`}
      >
        <div className={`sidebar-header w-full  h-36`}>
          <div className="sidebar-header-top w-full h-1/2  flex justify-between items-center">
            <div className="sidebar-header-top-logo-messages  w-2/4 flex h-full justify-between items-center p-2 text-lg">
              <img
                src="./public/logo.svg"
                alt="msu-logo"
                className="w-3/4 h-3/4 mr-2"
              />
              <h1>{"Messages(20)"}</h1>
            </div>
            <div className="sidebar-header-top-addUser text-[#8A8BE4] w-2/4 flex h-full justify-end items-center p-2 text-lg">
              <button
                onClick={() => {
                  setOpenNewChat("close");
                }}
                className="active:text-[#52526b] duration-700 hover:cursor-pointer "
              >
                + New Chat
              </button>
            </div>
          </div>
          <div className="sidebar-header-bottom  w-full h-1/2 p-1">
            <label
              htmlFor="search"
              className="w-full h-full relative flex items-center "
            >
              <input
                type="text"
                placeholder="search user..."
                className="w-full border-none bg-[#414568] rounded-full h-3/4 p-1.5 pl-4 focus:outline-none "
              />
              <UserRoundSearch
                strokeWidth={0.75}
                className="absolute right-5"
              />
            </label>
          </div>
        </div>
        <div className="sidebar-users-list w-full h-[73vh] overflow-auto scrollbar-hide">
          <SidebarUserCard />
          <SidebarGroupCard />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
