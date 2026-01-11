import axios from "axios";
import { createContext, useState, useEffect, type ReactNode, useContext, } from "react";



// Interface Based on Api
export interface Person {
  name: string;
  imageUrl: string;
}

// Update this in your roomContext.tsx or create a separate utility
export interface SingleChatRoom {
  id: string;
  senderId: string;
  receiverId: string;
  blocked: string | null;
  createdAt: string;
  updatedAt: string;
  sender: Person;
  receiver: Person;
  
  // Helper method to get other user's ID
  getOtherUserId?: (currentUserId: string) => string;
  // Helper method to get other user's data
  getOtherUser?: (currentUserId: string) => Person;
}


export interface GroupChatRoom {
  id: string;
  roomName: string;
  roomAdminId: string;
  createdAt: string;
  updatedAt: string;

  participants: Person[];
}


export interface ChatRoomResponse {
  message: string;
  userChatRooms: {
    singleChatRoom: SingleChatRoom[];
    groupChatRoom: GroupChatRoom[];
  };
}




//Interface based on Context


interface RoomContextType {
  singleChatRoom: SingleChatRoom[];
  groupChatRoom: GroupChatRoom[];
  loading: boolean;
}





export const RoomContext = createContext<RoomContextType | undefined>(undefined);




export const RoomProvider = ({ children }:{children: ReactNode}) => {
  const [singleChatRoom, setSingleChatRoom] = useState<SingleChatRoom[]>([]);
  const [groupChatRoom, setGroupChatRoom] = useState<GroupChatRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  const baseurl = import.meta.env.VITE_BACKEND_URL;
 useEffect(() => {
   const fetchChatrooms = async () => {
     try {
       if (!token) return;

       const fetchrooms = await axios.get<ChatRoomResponse>(
         `${baseurl}/user/get-chatRooms`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );

       console.log("API DATA ==>", fetchrooms.data);

       const data = fetchrooms.data;
       

       const singleChatRooms = data?.userChatRooms?.singleChatRoom ?? [];

       const groupChatRooms = data?.userChatRooms?.groupChatRoom ?? [];

       setSingleChatRoom(singleChatRooms);
       setGroupChatRoom(groupChatRooms);
     } catch (error) {
       console.error("Error fetching chat rooms:", error);
     } finally {
       setLoading(false);
     }
   };

   fetchChatrooms();
 }, []);


  return (
    <RoomContext.Provider value={{ singleChatRoom, groupChatRoom, loading }}>
      {children}
    </RoomContext.Provider>
  );
};


export const useRoomContext = () => {
  const ctx = useContext(RoomContext);
  if (!ctx) {
    throw new Error("useRoomContext must be used inside RoomProvider");
  }
  return ctx;
};
