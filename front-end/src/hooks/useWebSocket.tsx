import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "./useReactRedux";
import { usePopup } from "../contexts/CommonPopupContext";
import ReactPlayer from "react-player";
import config from "../configs/api-config";

export const useWebSockets = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const { openPopup, closePopup } = usePopup();

  useEffect(() => {
    const websocket = new WebSocket(config.BASE_URL_WEB_SOCKET);

    websocket.onopen = () => {
      console.log("connected");
      websocket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: '{"channel":"NewSharedChannel"}',
        })
      );
    };

    websocket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if (data.type === "ping") return;
      if (
        data.message &&
        data.message.name &&
        data.message.url &&
        data.message.description
      ) {
        openPopup("error", {
          title: "There is a new video shared",
          description: [
            "Title: " + data.message.name,
            "Description: " + data.message.description,
            <div className="w-full rounded-sm overflow-hidden bg-slate-600">
              <ReactPlayer width="auto" height={400} url={data.message.url} />
            </div>,
          ],
          closeButtonTitle: "OKE",
        });
      }
    };
    if (!authData?.auth_token) websocket.close();

    return () => {
      websocket.close();
    };
  }, [authData]);
};
