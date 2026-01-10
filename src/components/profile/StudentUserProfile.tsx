import { BookmarkCheck, BookmarkX, Pen } from "lucide-react";
import { useUser } from "../../contexts/userContext";
import { useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  phoneNumber: string;
  bio?: string | null;
  department?: string | null;
  semester ?: string | null;
};

const StudentUserProfile = () => {
  const { user } = useUser();
  const [editProfile, setEditProfile] = useState(false);

  const currentUser = user as User;

  const [bioValue, setBioValue] = useState(currentUser?.bio || "");
  const [phoneValue, setPhoneValue] = useState("");

  // Sync state when user loads
  useEffect(() => {
    if (currentUser) {
      setBioValue(currentUser.bio || "");
      setPhoneValue(currentUser.phoneNumber || "");
    }
  }, [currentUser]);

  if (!user) {
    return (
      <div className="p-5 w-full h-20 text-gray-400 text-2xl">
        Loading Profile...
      </div>
    );
  }

  return (
    <>
      {/* PROFILE SECTION */}
      <div className="p-5 w-full h-1/2 flex flex-col items-center justify-between">
        <img
          src={currentUser.imageUrl}
          alt="profile"
          className="w-30 h-30 border rounded-full"
        />

        <div className="mt-2 text-xl font-semibold">{currentUser.name}</div>

        {/* BIO */}
        <div className="w-full h-35 flex flex-col gap-1">
          <h1>Bio:</h1>
          <textarea
            disabled={!editProfile}
            placeholder="No bio"
            value={bioValue}
            onChange={(e) => {
              if (e.target.value.trim() === "") {
                setBioValue("");
              } else {
                setBioValue(e.target.value);
              }
            }}
            className={`w-full h-30 p-2 resize-none mb-2 scrollbar-hide focus:outline-none
              ${
                editProfile
                  ? " text-white border rounded-xl border-gray-300"
                  : "text-gray-400"
              }
            `}
          />
        </div>

        {/* PHONE */}
        <div className="w-full flex items-center gap-1">
          <h1 className="w-20">Phone no :</h1>
          <input
            type="number"
            disabled={!editProfile}
            value={phoneValue}
            onChange={(e) => {
              setPhoneValue(e.target.value);
            }}
            className={`w-4/6 h-10 text-left focus:outline-none p-2
              ${
                editProfile
                  ? "text-white rounded-xl border border-gray-300"
                  : "text-gray-400"
              }
            `}
          />
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="px-5 w-full h-65 flex flex-col items-center gap-3">
        <div className="w-full flex items-center gap-1">
          <h1 className="w-20">Email :</h1>
          <input
            type="text"
            disabled
            value={currentUser.email}
            className="w-4/6 h-10 p-2 text-gray-400 focus:outline-none"
          />
        </div>

        <div className="w-full flex items-center gap-1">
          <h1 className="w-25">Department :</h1>
          <input
            type="text"
            disabled
            value={currentUser.department || ""}
            className="w-4/6 h-10 p-2 text-gray-400 focus:outline-none"
          />
        </div>
        <div className="w-full flex items-center gap-1">
          <h1 className="w-25">Semester :</h1>
          <input
            type="text"
            disabled
            value={currentUser.semester || ""}
            className="w-4/6 h-10 p-2 text-gray-400 focus:outline-none"
          />
        </div>

        {/* ACTION BUTTONS */}
        {!editProfile ? (
          <div
            onClick={() => setEditProfile(true)}
            className="w-full flex items-center gap-2 text-[#8A8BE4] justify-center mt-5 hover:cursor-pointer shadow-lg p-2"
          >
            <Pen strokeWidth={1} />
            <button>Edit Profile</button>
          </div>
        ) : (
          <div className="w-full flex items-center gap-4 justify-center mt-5">
            {/* CANCEL */}
            <div
              onClick={() => {
                setBioValue(currentUser.bio || "");
                setPhoneValue(currentUser.phoneNumber || "");
                setEditProfile(false);
              }}
              className="w-25 flex items-center gap-2 text-[#8A8BE4] hover:cursor-pointer shadow-lg p-2"
            >
              <BookmarkX strokeWidth={1} />
              <button>Cancel</button>
            </div>

            {/* OK */}
            <div
              onClick={() => {
                console.log("Updated Bio:", bioValue);
                console.log("Updated Phone:", phoneValue);
                // TODO: API call here
                setEditProfile(false);
              }}
              className="w-25 flex items-center gap-2 text-[#8A8BE4] hover:cursor-pointer shadow-lg p-2"
            >
              <BookmarkCheck strokeWidth={1} />
              <button>Ok</button>
            </div>
          </div>
        )}
      </div>

     
    </>
  );
};

export default StudentUserProfile;
