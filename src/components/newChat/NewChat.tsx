import { ChevronLeft, UserRoundSearch, Users } from "lucide-react";
import NewChatUserlist from "./NewChatUserlist";
import CreateGroup from "../CreateGroup";
import { useEffect, useMemo, useState } from "react";
import { useRoomContext } from "../../contexts/roomContext";
import { useUser } from "../../contexts/userContext";
import { useSelectedRoom } from "../../contexts/selectedRoomContext";
import { fuzzyMatch } from "../../utils/fuzzyMatch";
import socket from "../../api/socket";

interface DbUser {
  id: string;
  name: string;
  email?: string;
  imageUrl?: string;
}

const NewChat = ({
  openNewChat,
  setOpenNewChat,
}: {
  openNewChat: string;
  setOpenNewChat: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [openCreateGroup, setOpenCreateGroup] = useState("closed");
  const [search, setSearch] = useState("");
  const [dbUsers, setDbUsers] = useState<DbUser[]>([]);
  const [searchingDb, setSearchingDb] = useState(false);

  const { singleChatRoom, loading } = useRoomContext();
  const { user } = useUser();
  const { setSelectedRoom } = useSelectedRoom();

  const token = localStorage.getItem("token");

  /* ---------------- EXISTING CHAT FILTER ---------------- */
   const filteredUsers = useMemo(() => {
     return singleChatRoom.filter((room) => {
       const otherUserName =
         user?.name === room.receiver.name
           ? room.sender.name
           : room.receiver.name;

       return fuzzyMatch(otherUserName, search);
     });
   }, [singleChatRoom, search, user]);

  /* ---------------- DB SEARCH ---------------- */
  useEffect(() => {
    if (!search || search.length < 3) {
      setDbUsers([]);
      return;
    }

    if (filteredUsers.length > 0) {
      setDbUsers([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setSearchingDb(true);

        const res = await fetch(
          `https://msu-chat-application.onrender.com/api/v1/user/find/${search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          setDbUsers([]);
          return;
        }

        const data = await res.json();
        const u = data.User;

        if (u) {
          setDbUsers([
            {
              id: u.id,
              name: u.name,
              email: u.email,
              imageUrl: u.imageUrl,
            },
          ]);
        } else {
          setDbUsers([]);
        }
      } catch (err) {
        console.error(err);
        setDbUsers([]);
      } finally {
        setSearchingDb(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, filteredUsers.length, token]);

  /* ---------------- START CHAT (IMPORTANT FIX) ---------------- */
  const startNewChat = async (receiver: DbUser) => {
    if (!user?.id) return;

    try {
      const res = await fetch(
        "https://msu-chat-application.onrender.com/api/v1/user/create-chatRoom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            senderId: user.id,
            receiverId: receiver.id,
          }),
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      const room = data.chatRoom;

      socket.emit("joinRoom", { roomId: room.id });

      setSelectedRoom({
        roomId: room.id,
        name: receiver.name,
        imageUrl: receiver.imageUrl || "",
        type: "single",
      });

      setOpenNewChat("open");
    } catch (err) {
      console.error("Failed to create chat room", err);
    }
  };

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
        ${openCreateGroup === "open" ? "hidden" : ""}
        transition-all duration-500`}
      >
        <div className="w-full h-full p-2">
          {/* HEADER */}
          <div className="flex items-center gap-4 mb-2">
            <button onClick={() => setOpenNewChat("open")}>
              <ChevronLeft />
            </button>
            <div>New Chat</div>
          </div>

          {/* SEARCH */}
          <div className="mb-2">
            <label className="relative flex items-center">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user"
                className="w-full bg-[#414568] rounded-full p-2 pl-4 focus:outline-none"
              />
              <UserRoundSearch className="absolute right-5" />
            </label>
          </div>

          {/* CREATE GROUP */}
          <div
            onClick={() => setOpenCreateGroup("open")}
            className="flex items-center gap-4 border-b border-gray-400 pb-2 mb-2 cursor-pointer"
          >
            <Users /> <span>+</span>
            <div>Create Group</div>
          </div>

          {/* USER LIST */}
          <div className="h-[75vh] overflow-auto scrollbar-hide">
            {!loading && filteredUsers.length > 0 && (
              <NewChatUserlist rooms={filteredUsers} />
            )}

            {!loading && filteredUsers.length === 0 && dbUsers.length > 0 && (
              <>
                <p className="text-xs text-gray-400 mb-2">New users</p>

                {dbUsers.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => startNewChat(u)}
                    className="flex items-center gap-3 p-2 hover:bg-[#484D73] cursor-pointer rounded"
                  >
                    <img
                      src={u.imageUrl || "public/logo.svg"}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p>{u.name}</p>
                      <p className="text-xs text-gray-400">Start chat</p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {searchingDb && (
              <p className="text-center text-sm text-gray-400 mt-4">
                Searching users...
              </p>
            )}

            {!loading &&
              filteredUsers.length === 0 &&
              dbUsers.length === 0 &&
              search.length >= 3 && (
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
