import { UserRoundSearch } from "lucide-react";
import SidebarUserCard from "./SidebarUserCard"
import SidebarGroupCard from "./SidebarGroupCard";

const Sidebar = () => {
  return (
    <div className="h-screen w-[23vw] bg-[#333657] p-2 text-white">
      <div className="sidebar-header w-full h-36">
        <div className="sidebar-header-top w-full h-1/2  flex justify-between items-center">
          <div className="sidebar-header-top-logo-messages  w-2/4 flex h-full justify-between items-center p-2 text-lg">
            <h1>logo</h1>
            <h1>{"Messages(20)"}</h1>
          </div>
          <div className="sidebar-header-top-addUser text-[#8A8BE4] w-2/4 flex h-full justify-end items-center p-2 text-lg">
            <button className="active:text-[#52526b] duration-700 hover:cursor-pointer ">
              + Add User
            </button>
          </div>
        </div>
        <div className="sidebar-header-bottom  w-full h-1/2 p-1">
          <label
            htmlFor="search"
            className="w-full h-full relative flex items-center"
          >
            <input
              type="text"
              placeholder="search user..."
              className="w-full border rounded-full h-3/4 p-1.5 pl-4 "
            />
            <UserRoundSearch strokeWidth={0.75} className="absolute right-5" />
          </label>
        </div>
      </div>
      <div className="sidebar-users-list w-full h-[73vh] overflow-auto scrollbar-hide">
        <SidebarUserCard />
        <SidebarUserCard />
        <SidebarGroupCard />
        <SidebarUserCard />
        <SidebarGroupCard />
        <SidebarUserCard />
        <SidebarUserCard />
        <SidebarUserCard />
      </div>
    </div>
  );
}

export default Sidebar
