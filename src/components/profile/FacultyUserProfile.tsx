import { BookmarkCheck, BookmarkX, Pen } from "lucide-react";
import { useUser } from "../../contexts/userContext";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../api/auth";

type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  phoneNumber: string;
  bio?: string | null;
  designation?: string | null;
};

const FacultyUserProfile = () => {
  const { user, updateUser } = useUser();
  const [editProfile, setEditProfile] = useState(false);
  const [saving, setSaving] = useState(false);

  const currentUser = user as User;

  const [bioValue, setBioValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (currentUser) {
      setBioValue(currentUser.bio || "");
      setPhoneValue(currentUser.phoneNumber || "");
    }
  }, [currentUser]);

  if (!user) {
    return <div className="p-5 text-gray-400">Loading Profile...</div>;
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
          bio: bioValue || "",
          phone: phoneValue || "",
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      // Optimistic UI update
      updateUser(data.user);

      setEditProfile(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="p-5 flex flex-col items-center">
        <img src={currentUser.imageUrl} className="w-30 h-30 rounded-full" />

        <div className="mt-2 text-xl">{currentUser.name}</div>

        {/* BIO */}
        <textarea
          disabled={!editProfile}
          value={bioValue}
          onChange={(e) => setBioValue(e.target.value)}
          className={`w-full h-28 p-2 mt-3 resize-none ${
            editProfile ? "border text-white" : "text-gray-400"
          }`}
        />

        {/* PHONE */}
        <input
          type="text"
          disabled={!editProfile}
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.target.value)}
          className={`w-full mt-2 p-2 ${
            editProfile ? "border text-white" : "text-gray-400"
          }`}
        />

        {!editProfile ? (
          <div
            onClick={() => setEditProfile(true)}
            className="mt-5 flex gap-2 cursor-pointer text-[#8A8BE4]"
          >
            <Pen /> Edit Profile
          </div>
        ) : (
          <div className="mt-5 flex gap-6">
            <div
              onClick={() => {
                setBioValue(currentUser.bio || "");
                setPhoneValue(currentUser.phoneNumber || "");
                setEditProfile(false);
              }}
              className="cursor-pointer text-[#8A8BE4]"
            >
              <BookmarkX /> Cancel
            </div>

            <div
              onClick={updateProfile}
              className="cursor-pointer text-[#8A8BE4]"
            >
              <BookmarkCheck />
              {saving ? "Saving..." : "Ok"}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FacultyUserProfile;
