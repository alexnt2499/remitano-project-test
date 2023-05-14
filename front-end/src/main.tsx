import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { store } from "./store";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import AuthCache from "./components/AuthCache";
import { QueryClient, QueryClientProvider } from "react-query";
import SocketConnect from "./components/SocketConnect";
import { PopupProvider } from "./contexts/CommonPopupContext";
import CommonPopup from "./components/Popups";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PopupProvider>
        <SocketConnect>
          <AuthCache>
            <RouterProvider router={router} />
          </AuthCache>
          <ToastContainer
            position="top-center"
            hideProgressBar
            autoClose={1000}
            style={{ color: "#E25148" }}
            transition={Slide}
          />
          <CommonPopup />
        </SocketConnect>
      </PopupProvider>
    </Provider>
  </QueryClientProvider>
);
