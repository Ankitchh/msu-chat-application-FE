import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Gender = "MALE" | "FEMALE" | "OTHERS";
type UserRole = "STUDENT" | "STAFF" | "ADMIN";
type status = "AVAILABLE" | "NOT_AVAILABLE";
type verified = true | false;

export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  department: string;
  bio: string | null;
  semester: string;
  registrationNo: string | null;
  isEmailVerified: verified;
  phoneNumber: string;
  gender: Gender;
  degsination: string | null;
  userRole: UserRole;
  status: status;
  createdAt: Date;
  updatedAt: Date;
}

interface UserContextType {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  setUser: (data: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage ONCE
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as User;
      setUser(parsed);
    } catch (err) {
      console.error("Invalid user in local storage:", err);
    }
  }, []);

  const login = (data: User) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.clear();
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;

    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
};
