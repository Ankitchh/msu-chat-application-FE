import { UserRound } from "lucide-react";


const SidebarGroupCard = () => {
  return (
    <div className="sidebar-group-list-group-card w-full h-2/12 p-1 hover:bg-[#484D73] border-b border-[#484D73] pb-2">
      <div className="group-card-group-details w-full h-3/4  p-0.5 flex gap-2 items-center">
        <div className="group-card-group-details-avtar w-2/12 h-full  rounded-full flex items-center justify-between">
          <UserRound strokeWidth={0.75} className="w-full h-full" />
        </div>
        <div className="group-card-group-details-name w-7/12 h-full  ">
          <h2 className="w-full h-full flex items-center justify-start pl-1">
            Group Name
          </h2>
        </div>
        <div className="group-card-group-details-lastActive w-3/12 h-full  text-sm">
          <h3 className="w-full h-full flex items-center justify-start pl-1 text-slate-400">
            5 min ago
          </h3>
        </div>
      </div>
      <div className="group-card-message w-full h-1/4 text-xs px-2 flex items-center justify-between ">
        <h3 className="w-[90%] text-slate-400 ">+91 1234567890: Hello Sir</h3>
        <p className="bg-red-300 min-w-4 text-center min-h-4 rounded-full p-1 ">
          10
        </p>
      </div>
    </div>
  );
}

export default SidebarGroupCard

