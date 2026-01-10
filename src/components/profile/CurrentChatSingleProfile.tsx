import { useUser } from "../../contexts/userContext";

const CurrentChatSingleProfile = () => {

  const { user } = useUser();

  type User = {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    phoneNumber: string;
    bio?: string | null;
    department?: string;
    semester?: string;
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
          <h1 className="w-25">Department : </h1>
          <input
            type="text"
            disabled
            value={user.department}
            className="w-4/6 h-10 text-left  focus:outline-none p-2 text-gray-400"
          />
        
        </div>
        <div className="w-full flex items-center gap-1">
          <h1 className="w-25">Semester : </h1>
          <input
            type="text"
            disabled
            value={user.semester}
            className="w-4/6 h-10 text-left  focus:outline-none p-2 text-gray-400"
          />
        </div>

      </div>

    </>
  );
}

export default CurrentChatSingleProfile
