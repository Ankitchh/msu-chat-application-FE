import {
  BookmarkCheck,
  BookmarkX,
  ChevronLeft,
  LogOut,
  Pen,
} from "lucide-react";
import { useUser } from "../../contexts/userContext";
import { useState } from "react";

const FacultyUserProfile = () => {
  const { user } = useUser();
  const [editProfile, setEditProfile] = useState(false);

  type User = {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    phoneNumber: string;
    bio?: string | null;
    designation?: string | null;
  };

  const currentUser = user as User;

  const bio = currentUser?.bio || "No bio available right now.";

  console.log(user);

  if (!user) {
    return (
      <>
        <div className=" p-5 w-full h-20 text-gray-400 text-2xl">
          Loading Profile...
        </div>
      </>
    );
  }

  return (
    <>
    
      <div className=" p-5 w-full h-1/2 flex flex-col items-center justify-between">
        <img
          src={currentUser.imageUrl}
          alt="profile"
          className="w-30 h-30 border rounded-full"
        />
        <div className="mt-2 text-xl font-semibold">{currentUser.name}</div>

        <div className="w-full h-35  flex flex-col gap-1">
          <h1>Bio:</h1>
          <textarea
            disabled
            value={bio}
            className="w-full h-30 p-2 resize-none text-gray-400 mb-2 scrollbar-hide focus:outline-none"
          />
        </div>

        <div className="w-full flex items-center gap-1">
          <h1 className="w-20">Phone no : </h1>
          <input
            type="text"
            disabled
            value={user.phoneNumber}
            className="w-4/6 h-10 text-left  focus:outline-none p-2 text-gray-400"
          />
        </div>
      </div>

      <div className="px-5 w-full h-65  flex flex-col items-center gap-3">
        <div className="w-full flex items-center gap-1">
          <h1 className="w-20">Email : </h1>
          <input
            type="text"
            disabled
            value={user.email}
            className="w-4/6 h-10 text-left  focus:outline-none p-2 text-gray-400"
          />
        </div>
        <div className="w-full flex items-center gap-1">
          <h1 className="w-25">Designation : </h1>
          <input
            type="text"
            disabled
            value={user?.degsination || ""}
            className="w-4/6 h-10 text-left  focus:outline-none p-2 text-gray-400"
          />
        </div>
        {!editProfile ? (
          <div
            onClick={() => {
              setEditProfile(true);
            }}
            className="w-full flex items-center gap-2 mr-2 text-[#8A8BE4] justify-center mt-5 active:text-[#52526b] duration-700 hover:cursor-pointer shadow-lg p-2"
          >
            <Pen strokeWidth={1} />
            <button className="hover:cursor-pointer ">Edit Profile</button>
          </div>
        ) : (
          <div className="w-full flex items-center gap-2 mr-2 text-[#8A8BE4] justify-center mt-5 ">
            <div
              onClick={() => {
                setEditProfile(false);
              }}
              className="w-25 justify-center flex items-center gap-2 active:text-[#52526b] duration-700 hover:cursor-pointer shadow-lg p-2"
            >
              <BookmarkX strokeWidth={1} />
              <button className="hover:cursor-pointer">Cancle</button>
            </div>
            <div
              onClick={() => {
                setEditProfile(false);
              }}
              className="w-25 justify-center flex items-center gap-2 active:text-[#52526b] duration-700 hover:cursor-pointer shadow-lg p-2"
            >
              <BookmarkCheck strokeWidth={1} />
              <button className="hover:cursor-pointer">Ok</button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex items-center text-[#8A8BE4] justify-end mt-2 p-2">
        <div className="w-35 mr-5 justify-center flex items-center gap-2 active:text-[#52526b] duration-700 hover:cursor-pointer shadow-xl p-2">
          <LogOut strokeWidth={1} />
          <button className="hover:cursor-pointer">Logout</button>
        </div>
      </div>
    </>
  );
};

export default FacultyUserProfile;
