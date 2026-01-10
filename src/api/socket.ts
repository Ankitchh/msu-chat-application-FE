import { io } from "socket.io-client";

const socket = io("https://msu-chat-application.onrender.com", {
  transports: ["websocket"],
});

export default socket;
