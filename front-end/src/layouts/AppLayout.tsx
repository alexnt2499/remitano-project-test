import React, { FC, ReactElement } from "react";
import { NavBar } from "../components/layout";

interface IAppLayout {
  children: ReactElement;
}

const AppLayout: FC<IAppLayout> = ({ children }) => {
  return (
    <div className="w-[100vw]">
      <NavBar />
      <div className="flex justify-center items-center w-[100vw]">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
