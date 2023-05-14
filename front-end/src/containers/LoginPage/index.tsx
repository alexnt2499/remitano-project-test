import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import RHInput from "../../components/RHForm/RHInput";
import config from "../../configs/api-config";
import { useAppDispatch, useAppSelector } from "../../hooks/useReactRedux";
import { selectAuth } from "../../store/authReducer";
import { loginAsyncThunk } from "../../store/authReducer/asyncThunk";
import RHForm from "./../../components/RHForm";

const loginValidationSchema = yup.object({
  email: yup.string().required("email field cannot be left blank").email(),
  password: yup.string().required("password field cannot be left blank"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { is_loading, authData, userInfo } = useAppSelector(selectAuth);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    dispatch(
      loginAsyncThunk({
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (authData && userInfo) navigate("/shared");
  }, [authData, userInfo]);

  return (
    <div className="w-[100vw] mt-8 flex justify-center items-center relative">
      <div className="w-[520px] max-md:bg-transparent max-md:p-6 max-lg:p-8 p-10 z-[100] shadow-2xl max-md:shadow-none">
        <div className="flex justify-center">
          <Logo className="h-28" />
        </div>
        <RHForm
          defaultValues={{}}
          onSubmit={onSubmit}
          validationSchemaParams={loginValidationSchema}
        >
          <RHInput
            name="email"
            labelText="Email"
            placeholder="example@mail.com"
            containerClassName="mt-5"
          />
          <RHInput
            name="password"
            labelText="Password"
            type="password"
            placeholder="Enter password"
            containerClassName="mt-5"
          />
          <Button
            type="submit"
            className={`w-full bg-primary-500 ${
              is_loading ? "opacity-60" : "opacity-100"
            } flex justify-center items-center py-3 mt-5 rounded-md text-white font-bold`}
            disabled={is_loading}
            is_loading={is_loading}
            data-cy="submit"
          >
            <p>Log in</p>
          </Button>
        </RHForm>

        <p onClick={() => navigate("/sign-up")} className="text-center mt-5">
          If you don't have an account, please register{" "}
          <span className="text-blue-500 hover:text-blue-700 underline  cursor-pointer">
            here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
