import { useEffect, useMemo, useState } from "react";
import { useRoomContext } from "../contexts/roomContext";
import { useUser } from "../contexts/userContext";
import { ChevronLeft } from "lucide-react";
import { fuzzyMatch } from "../utils/fuzzyMatch";

interface GroupUser {
  roomId: string;
  imageUrl: string;
  name: string;
  type: "single";
}

const CreateGroup = ({
  openCreateGroup,
  setOpenCreateGroup,
}: {
  openCreateGroup: string;
  setOpenCreateGroup: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { singleChatRoom, loading } = useRoomContext();
  const { user } = useUser();

  const [search, setSearch] = useState("");
  const [groupName, setGroupName] = useState("");

  const [selectedUsers, setSelectedUsers] = useState<GroupUser[]>([]);
  const [availableUsers, setAvailableUsers] = useState<GroupUser[]>([]);

  // 🔄 Prepare initial users
  useEffect(() => {
    if (!loading) {
      const formatted: GroupUser[] = singleChatRoom.map((room) => ({
        roomId: room.id,
        imageUrl:
          user?.name === room.receiver.name
            ? room.sender.imageUrl
            : room.receiver.imageUrl,
        name:
          user?.name === room.receiver.name
            ? room.sender.name
            : room.receiver.name,
        type: "single",
      }));

      setAvailableUsers(formatted);
    }
  }, [loading, singleChatRoom, user]);

  // 🔍 Search ONLY available users
  const filteredAvailableUsers = useMemo(() => {
    return availableUsers.filter((u) => fuzzyMatch(u.name, search));
  }, [availableUsers, search]);

  // ➕ Add member
  const addMember = (member: GroupUser) => {
    setSelectedUsers((prev) => [...prev, member]);
    setAvailableUsers((prev) => prev.filter((u) => u.roomId !== member.roomId));
  };

  // ➖ Remove member
  const removeMember = (member: GroupUser) => {
    setAvailableUsers((prev) => [...prev, member]);
    setSelectedUsers((prev) => prev.filter((u) => u.roomId !== member.roomId));
  };

  // 🆕 Create group
  const makeNewGroup = () => {
    if (!groupName.trim() || selectedUsers.length === 0) {
      alert("Group name and members required");
      return;
    }

    console.log("Creating group:", {
      groupName,
      members: selectedUsers,
    });

    setGroupName("");
    setSelectedUsers([]);
    setSearch("");
    setOpenCreateGroup("closed");
  };

  if (loading) return <></>;

  return (
    <div
      className={`${
        openCreateGroup === "open" ? "w-[23vw] p-2" : "w-0 p-0 opacity-0"
      } relative h-screen overflow-hidden bg-[#333657] text-white
      border-r border-[#484D73] transition-all duration-500`}
    >
      <div className="w-full h-full p-2">
        {/* HEADER + SEARCH */}
        <div className="w-full h-9 mb-3 flex items-center gap-3 bg-[#414568] rounded-full px-2">
          <button
            onClick={() => setOpenCreateGroup("closed")}
            className="hover:cursor-pointer"
          >
            <ChevronLeft />
          </button>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search user..."
            className="w-full bg-transparent focus:outline-none"
          />
        </div>

        {/* GROUP NAME */}
        <div className="w-full h-10">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group name..."
            className="w-full h-full p-3 px-4 bg-[#414568] rounded-xl focus:outline-none"
          />
        </div>

        <h2 className="my-2 text-gray-400 text-sm">Add Members:</h2>

        {/* SELECTED USERS */}
        <div className="w-full max-h-40 overflow-auto scrollbar-hide">
          <div className="flex gap-2 flex-wrap p-2">
            {selectedUsers.map((m) => (
              <div
                key={m.roomId}
                className="relative flex gap-2 items-center bg-[#414568] rounded-xl p-3"
              >
                <button
                  onClick={() => removeMember(m)}
                  className="absolute -top-3 right-2 text-lg"
                >
                  ×
                </button>

                <img src={m.imageUrl} className="w-8 h-8 rounded-full" />
                <h4 className="text-sm">{m.name}</h4>
              </div>
            ))}

            {selectedUsers.length === 0 && (
              <p className="text-gray-400 text-xs">No members added</p>
            )}
          </div>
        </div>

        {/* AVAILABLE USERS */}
        <div className="w-full h-[60vh] mt-4 overflow-auto scrollbar-hide">
          {filteredAvailableUsers.map((member) => (
            <div
              key={member.roomId}
              onClick={() => addMember(member)}
              className="w-full p-2 hover:bg-[#484D73] border-b border-[#484D73] cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img src={member.imageUrl} className="w-10 h-10 rounded-full" />
                <h2 className="text-sm">{member.name}</h2>
              </div>
            </div>
          ))}

          {filteredAvailableUsers.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-5">
              No users found
            </p>
          )}
        </div>
      </div>

      {/* CREATE BUTTON */}
      <div className="absolute bottom-0 left-0 w-full h-16 flex items-center justify-center bg-[#333657]">
        <button
          onClick={makeNewGroup}
          className="w-[20vw] h-8 border border-gray-400 rounded bg-[#414568]
          active:text-[#52526b] shadow-md shadow-gray-500"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
