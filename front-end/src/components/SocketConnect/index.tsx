import React, { FC, ReactElement, ReactNode } from "react";
import { useWebSockets } from "../../hooks/useWebSocket";

interface ISocketConnect {
  children: any;
}
const SocketConnect: FC<ISocketConnect> = ({ children }) => {
  useWebSockets();
  return children;
};

export default SocketConnect;
