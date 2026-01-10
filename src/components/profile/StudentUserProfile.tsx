import { BookmarkCheck, BookmarkX, Pen } from "lucide-react";
import { useUser } from "../../contexts/userContext";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../api/auth";

type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  phoneNumber: string;
  bio?: string | null;
  department?: string | null;
  semester?: string | null;
};

const StudentUserProfile = () => {
  const { user, updateUser } = useUser();
  const [editProfile, setEditProfile] = useState(false);
  const [saving, setSaving] = useState(false);

  const currentUser = user as User;

  const [bioValue, setBioValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 Sync state when user loads
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

  /* ---------------- UPDATE PROFILE ---------------- */
  const updateProfile = async () => {
    try {
      setSaving(true);

      const res = await fetch(`${BACKEND_URL}/user/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bio: bioValue,
          phone: phoneValue,
        }),
      });

      if (!res.ok) throw new Error("Profile update failed");
      const data = await res.json();
      // ✅ Optimistic UI update
      updateUser(data.user);
      // console.log("Updated user data:", data.user);

      setEditProfile(false);
    } catch (err) {
      console.error("Update profile error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* PROFILE SECTION */}
      <div className="p-5 w-full flex flex-col items-center gap-3">
        <img
          src={currentUser.imageUrl}
          alt="profile"
          className="w-30 h-30 border rounded-full"
        />

        <div className="text-xl font-semibold">{currentUser.name}</div>

        {/* BIO */}
        <div className="w-full">
          <h1>Bio:</h1>
          <textarea
            disabled={!editProfile}
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
            className={`w-full h-28 p-2 resize-none scrollbar-hide focus:outline-none
                ${
                  editProfile
                    ? "text-white border rounded-xl border-gray-300"
                    : "text-gray-400"
                }`}
          />
        </div>

        {/* PHONE */}
        <div className="w-full flex items-center gap-2">
          <h1 className="w-20">Phone:</h1>
          <input
            type="text"
            disabled={!editProfile}
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
            className={`w-4/6 h-10 p-2 focus:outline-none
                ${
                  editProfile
                    ? "text-white rounded-xl border border-gray-300"
                    : "text-gray-400"
                }`}
          />
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="px-5 w-full flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h1 className="w-20">Email:</h1>
          <input
            type="text"
            disabled
            value={currentUser.email}
            className="w-4/6 h-10 p-2 text-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <h1 className="w-25">Department:</h1>
          <input
            type="text"
            disabled
            value={currentUser.department || ""}
            className="w-4/6 h-10 p-2 text-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <h1 className="w-25">Semester:</h1>
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
            className="w-full flex items-center gap-2 text-[#8A8BE4] justify-center mt-5 cursor-pointer shadow-lg p-2"
          >
            <Pen strokeWidth={1} />
            <button>Edit Profile</button>
          </div>
        ) : (
          <div className="w-full flex items-center gap-6 justify-center mt-5">
            {/* CANCEL */}
            <div
              onClick={() => {
                setBioValue(currentUser.bio || "");
                setPhoneValue(currentUser.phoneNumber || "");
                setEditProfile(false);
              }}
              className="flex items-center gap-2 text-[#8A8BE4] cursor-pointer shadow-lg p-2"
            >
              <BookmarkX strokeWidth={1} />
              <button>Cancel</button>
            </div>

            {/* OK */}
            <div
              onClick={updateProfile}
              className="flex items-center gap-2 text-[#8A8BE4] cursor-pointer shadow-lg p-2"
            >
              <BookmarkCheck strokeWidth={1} />
              <button>{saving ? "Saving..." : "Ok"}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentUserProfile;
