import { io } from "socket.io-client";

const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

export const initSocket = async () => {
  return io(SERVER_URL, {
    transports: ["websocket", "polling"],
  });
};