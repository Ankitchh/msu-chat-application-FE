// import { UserRound } from "lucide-react";
const SidebarUserCard = () => {
  return (
    <div className="sidebar-user-list-user-card w-full h-2/12 p-1 hover:bg-[#484D73] border-b border-[#484D73] pb-2">
      <div className="user-card-user-details w-full h-3/4  p-0.5 flex gap-2 items-center">
        <div className="user-card-user-details-avtar w-2/12 h-full  rounded-full flex items-center justify-between">
          {/* <UserRound strokeWidth={0.75} className="w-full h-full" /> */}
          <img
            src="https://avatars.githubusercontent.com/u/64682052?v=4"
            alt="User profile"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="user-card-user-details-name w-7/12 h-full  ">
          <h2 className="w-full h-full flex items-center justify-start pl-1">
            Amit Bhgat
          </h2>
        </div>
        <div className="user-card-user-details-lastActive w-3/12 h-full  text-sm">
          <h3 className="w-full h-full flex items-center justify-start pl-1 text-slate-400">
            5 min ago
          </h3>
        </div>
      </div>
      <div className="user-card-message w-full h-1/4 text-xs pl-16 pr-2 flex items-center justify-between ">
        <h3 className="w-[90%] text-slate-400 ">Hello Sir</h3>
        <p className="bg-red-300 min-w-4 text-center min-h-4 rounded-full p-1 ">
          10
        </p>
      </div>
    </div>
  );
};

export default SidebarUserCard;
