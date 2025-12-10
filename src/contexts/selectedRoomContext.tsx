import { createContext, useContext, useState, type ReactNode  } from "react";

interface SelectedRoom {
  roomId: string;
imageUrl: string | null;
  name: string;
  type: string;
}

interface SelectedRoomContextType {
  selectedRoom: SelectedRoom | null;
  setSelectedRoom: (room: SelectedRoom) => void;
}

const SelectedRoomContext = createContext<SelectedRoomContextType | undefined>(
  undefined
);



export const SelectedRoomProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoom | null>(null);

  return (
    <SelectedRoomContext.Provider value={{ selectedRoom, setSelectedRoom }}>
      {children}
    </SelectedRoomContext.Provider>
  );
};

export const useSelectedRoom = () => {
  const ctx = useContext(SelectedRoomContext);
  if (!ctx)
    throw new Error("useSelectedRoom must be used inside SelectedRoomProvider");
  return ctx;
};
