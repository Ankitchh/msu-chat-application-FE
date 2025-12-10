import { useRoomContext } from '../../contexts/roomContext';
import { useSelectedRoom } from '../../contexts/selectedRoomContext';
import { useUser } from '../../contexts/userContext';

const NewChatUserlist = () => {
  const { singleChatRoom, loading } = useRoomContext();
  const { setSelectedRoom } = useSelectedRoom();

  const openRoom = (roomId: string,imageUrl: string,name: string,type: string) => {
    setSelectedRoom({ roomId, imageUrl, name ,type});
  }
  
  const {user} =useUser();

  if (loading) {
    return <div></div>; 
  }
  return (
    <>
      {singleChatRoom.map((room) => (
        
    <div onClick={()=>{openRoom(room.id, room.receiver.imageUrl,room.receiver.name,"single");}}  key={room.id} className="new-chat-user-list-user-card w-full h-15 p-1 hover:bg-[#484D73] border-b border-[#484D73] ">
      <div className="user-card-user-details w-full h-3/4  p-0.5 flex gap-2 items-center">
        <div className="user-card-user-details-avtar w-2/12 h-full  rounded-full flex items-center justify-between">
          {/* <UserRound strokeWidth={0.75} className="w-full h-full" /> */}
          <img
            src={user.name === room.receiver.name ? room.sender.imageUrl : room.receiver.imageUrl}
            alt="User profile"
            className="w-3/4 h-3/4 rounded-full"
            />
            
          </div>
          
        <div className="user-card-user-details-name w-7/12 h-full  ">
          <h2 className="w-full h-full flex items-center justify-start pl-1 text-sm">
            {user.name === room.receiver.name ? room.sender.name : room.receiver.name}
          </h2>
        </div>
        
      </div>
      
    </div > ))}
    </>
  );
}

export default NewChatUserlist
