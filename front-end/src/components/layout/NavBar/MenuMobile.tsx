import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useReactRedux";
import { logoutAction, selectAuth } from "../../../store/authReducer";
import { listNavMenu } from "../../../utils/menu";
import Avatar from "../../Avatar";

const MenuMobile = () => {
  const location = useLocation();
  const { userInfo } = useAppSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <ul className="hidden max-sm:flex flex-col ml-3 z-50">
      <li className="flex items-center mt-7">
        <Avatar />
        <p className="ml-2 text-primary-500 font-bold">{`${
          userInfo?.email ?? ""
        } `}</p>
        <button onClick={onLogout} className="mx-2 p-1">
          <ArrowRightOnRectangleIcon className="h-6 w-6 transition-all duration-200 text-red-600 hover:text-red-800" />
        </button>
      </li>
    </ul>
  );
};

export default MenuMobile;
