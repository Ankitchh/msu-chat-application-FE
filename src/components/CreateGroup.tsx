import { useEffect, useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { useRoomContext } from "../contexts/roomContext";
import { useUser } from "../contexts/userContext";

const CreateGroup = ({ openCreateGroup, setOpenCreateGroup }: { openCreateGroup: string; setOpenCreateGroup: React.Dispatch<React.SetStateAction<string>> }) => {



  const { singleChatRoom, loading } = useRoomContext();
  const { user } = useUser();

  // ✅ Users selected for group
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  // ✅ Users available to select (initial list)
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);

  // ⏳ Load users from room
  useEffect(() => {
    if (!loading && singleChatRoom.length > 0) {
      const formatted = singleChatRoom.map((room) => ({
        roomId: room.id,
        imageUrl:
          user.name === room.receiver.name
            ? room.sender.imageUrl
            : room.receiver.imageUrl,
        name:
          user.name === room.receiver.name
            ? room.sender.name
            : room.receiver.name,
        type: "single",
      }));

      setAvailableUsers(formatted);
    }
  }, [loading, singleChatRoom]);

  // ➕ Add member and remove from list
  const addMember = (member: any) => {
    setSelectedUsers((prev) => [...prev, member]);
    setAvailableUsers((prev) => prev.filter((u) => u.roomId !== member.roomId));
  };

  // ➖ Remove member and add back to list
  const removeMember = (member: any) => {
    setAvailableUsers((prev) => [...prev, member]);
    setSelectedUsers((prev) => prev.filter((u) => u.roomId !== member.roomId));
  }

  // 🆕 Create new group
  const makeNewGroup = () => {
    // Logic to create new group with selectedUsers
    console.log("Creating group with members:", selectedUsers);
    setSelectedUsers([]);
  };
  if (loading) return <div></div>;

  return (
    <>
      <div
        className={`${openCreateGroup === "open" ? "w-[23vw] p-2 " : "w-0 p-0 overflow-hidden hidden opacity-0"} relative create-group-component h-screen overflow-hidden
          w-[23vw] p-2 bg-[#333657] text-white border-r border-[#484D73] transition-all duration-500 `}
      >
        <div className="create-group w-full h-full p-2">
          {/* Header */}
          <div className="create-group-head w-full h-9 mb-3 flex items-center gap-4 border-none bg-[#414568] rounded-full ">
            <label
              htmlFor="search"
              className="w-full h-full relative flex items-center "
            >
              <button onClick={() => { setOpenCreateGroup("closed") }}  className="active:text-[#52526b] duration-700 hover:cursor-pointer ">
                <ChevronLeft />
              </button>
              <input
                type="text"
                placeholder="search user..."
                className="w-full  h-3/4 p-1.5 pl-4 focus:outline-none "
              />
            </label>
          </div>

          {/* Group name + selected members */}
          <div className="group-name-member w-full h-auto">
            <div className="group-name w-full h-10 ">
              <input
                type="text"
                placeholder="Group name.."
                className="w-full h-full p-3 px-4 focus:outline-none  bg-[#414568] rounded-xl  text-white"
              />
            </div>

            <h2 className="my-2 text-gray-400 text-sm">Add Members:</h2>

            {/* SELECTED USERS */}
            <div className="group-members w-full max-h-40 mt-3 overflow-auto scrollbar-hide">
              <div className=" group-members-list w-full flex gap-2 flex-wrap p-2">
                {selectedUsers.map((m) => (
                  <div
                    key={m.roomId}
                    className="relative flex gap-2 items-center bg-[#414568] rounded-xl p-3"
                  >
                    <button onClick={()=>{removeMember(m)}} className="absolute text-lg -top-4 p-1 right-2 hover:cursor-pointer">
                      _
                    </button>
                    <img
                      src={m.imageUrl}
                      alt="profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <h4 className="text-sm">{m.name}</h4>
                  </div>
                ))}

                {selectedUsers.length === 0 && (
                  <p className="text-gray-400 text-xs">No members added</p>
                )}
              </div>
            </div>
          </div>

          {/* AVAILABLE USERS LIST */}
          <div className="create-group-users-list w-full h-[74vh] overflow-auto scrollbar-hide mt-4">
            {availableUsers.map((member) => (
              <div
                key={member.roomId}
                onClick={() => addMember(member)}
                className="new-chat-user-list-user-card w-full p-2 hover:bg-[#484D73] border-b border-[#484D73] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={member.imageUrl}
                    alt="User profile"
                    className="w-10 h-10 rounded-full"
                  />

                  <h2 className="text-sm">{member.name}</h2>
                </div>
              </div>
            ))}

            {availableUsers.length === 0 && (
              <p className="text-center text-gray-400 text-sm mt-5">
                No more users to add
              </p>
            )}
          </div>
        </div>

        <div onClick={()=>{makeNewGroup()}} className="create-group-button w-full h-18 mt-5 absolute bottom-0 left-0 flex items-center justify-center bg-[#333657] ">
          <h1 className="w-[20vw] h-8 p-4 flex items-center justify-center active:text-[#52526b] duration-700 border border-gray-400 rounded hover:cursor-pointer shadow-md shadow-gray-500 bg-[#414568]">
            Create Group
          </h1>
        </div>
      </div>
    </>
  );
};

export default CreateGroup;
