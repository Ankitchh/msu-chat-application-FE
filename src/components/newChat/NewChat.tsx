import { ChevronLeft, UserRoundSearch, Users } from "lucide-react";
import NewChatUserlist from "./NewChatUserlist";
import CreateGroup from "../CreateGroup";
import { useMemo, useState } from "react";
import { useRoomContext } from "../../contexts/roomContext";
import { useUser } from "../../contexts/userContext";
import { fuzzyMatch } from "../../utils/fuzzyMatch";

const NewChat = ({
  openNewChat,
  setOpenNewChat,
}: {
  openNewChat: string;
  setOpenNewChat: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [openCreateGroup, setOpenCreateGroup] = useState<string>("closed");
  const [search, setSearch] = useState("");

  const { singleChatRoom, loading } = useRoomContext();
  const { user } = useUser();

  // 🔍 Filter ONLY single users
  const filteredUsers = useMemo(() => {
    return singleChatRoom.filter((room) => {
      const otherUserName =
        user?.name === room.receiver.name
          ? room.sender.name
          : room.receiver.name;

      return fuzzyMatch(otherUserName, search);
    });
  }, [singleChatRoom, search, user]);

  return (
    <>
      <CreateGroup
        openCreateGroup={openCreateGroup}
        setOpenCreateGroup={setOpenCreateGroup}
      />

      <div
        className={`h-screen ${
          openNewChat === "open"
            ? "w-0 overflow-hidden opacity-0"
            : "w-[23vw] p-2"
        } bg-[#333657] text-white border-r border-[#484D73]
        ${
          openCreateGroup === "open"
            ? "w-0 overflow-hidden hidden opacity-0"
            : ""
        }
        transition-all duration-500`}
      >
        <div className="new-chat w-full h-full p-2">
          {/* Header */}
          <div className="new-chat-head w-full h-8 mb-1 flex items-center gap-4">
            <button
              onClick={() => setOpenNewChat("open")}
              className="active:text-[#52526b] duration-700 hover:cursor-pointer"
            >
              <ChevronLeft />
            </button>
            <div>New Chat</div>
          </div>

          {/* Search */}
          <div className="new-chat-search w-full h-16 p-1 mb-1">
            <label className="w-full h-full relative flex items-center">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search user..."
                className="w-full border-none bg-[#414568] rounded-full h-3/4 p-1.5 pl-4 focus:outline-none"
              />
              <UserRoundSearch
                strokeWidth={0.75}
                className="absolute right-5"
              />
            </label>
          </div>

          {/* Create Group */}
          <div
            onClick={() => setOpenCreateGroup("open")}
            className="new-chat-group w-full h-8 mb-2 border-b border-gray-400 flex items-center gap-4 pb-4 p-1 hover:cursor-pointer"
          >
            <Users strokeWidth={1} /> <span>+</span>
            <div>Create Group</div>
          </div>

          {/* User List */}
          <div className="new-chat-users-list w-full h-[75vh] overflow-auto scrollbar-hide">
            {loading && (
              <p className="text-center text-sm text-gray-300 mt-4">
                Loading...
              </p>
            )}

            {!loading && <NewChatUserlist rooms={filteredUsers} />}

            {!loading && filteredUsers.length === 0 && (
              <p className="text-center text-sm text-gray-400 mt-5">
                No users found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewChat;
