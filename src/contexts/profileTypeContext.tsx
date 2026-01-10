import { createContext, useContext, useState, type ReactNode } from "react";

type ProfileType = "own" | "chat";

type ProfileTypeContextType = {
  profileType: ProfileType;
  setProfileType: React.Dispatch<React.SetStateAction<ProfileType>>;
};

const ProfileTypeContext = createContext<ProfileTypeContextType | undefined>(
  undefined
);

export const ProfileTypeProvider = ({ children }: { children: ReactNode }) => {
  const [profileType, setProfileType] = useState<ProfileType>("own");

  return (
    <ProfileTypeContext.Provider value={{ profileType, setProfileType }}>
      {children}
    </ProfileTypeContext.Provider>
  );
};

export const useProfileType = () => {
  const context = useContext(ProfileTypeContext);
  if (!context) {
    throw new Error("useProfileType must be used within a ProfileTypeProvider");
  }
  return context;
};
