import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import RHInput from "../../components/RHForm/RHInput";
import { useAppDispatch, useAppSelector } from "../../hooks/useReactRedux";
import { selectAuth, setSignUpSuccess } from "../../store/authReducer";
import RHForm from "../../components/RHForm";
import { signupAsyncThunk } from "../../store/authReducer/asyncThunk";

const signUpValidationSchema = yup.object({
  name: yup.string().required("Your name field cannot be left blank"),
  email: yup.string().required("Your email field cannot be left blank").email(),
  password: yup.string().required("Your password field cannot be left blank"),
  confirmPassword: yup
    .string()
    .required("Your password field cannot be left blank")
    .oneOf(
      [yup.ref("password")],
      "Confirm passwords not match with new passwords"
    ),
});

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { is_loading, sign_up_success } = useAppSelector(selectAuth);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    dispatch(
      signupAsyncThunk({
        email: data.email,
        password: data.password,
        name: data.name,
      })
    );
  };

  useEffect(() => {
    if (sign_up_success) {
      navigate("/login");
      dispatch(setSignUpSuccess(false));
    }
  }, [sign_up_success]);

  return (
    <div className="w-[100vw] mt-8 flex justify-center items-center relative">
      <div className="w-[520px] max-md:bg-transparent max-md:p-6 max-lg:p-8 p-10 z-[100] border border-gray-100 shadow-xl  max-md:shadow-none">
        <div className="flex justify-center">
          <Logo className="h-28" />
        </div>
        <RHForm
          defaultValues={{}}
          onSubmit={onSubmit}
          validationSchemaParams={signUpValidationSchema}
        >
          <RHInput
            name="name"
            labelText="Your name"
            placeholder="Enter your name"
            containerClassName="mt-5"
          />
          <RHInput
            name="email"
            labelText="Your email"
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
          <RHInput
            name="confirmPassword"
            labelText="Confirm password"
            type="password"
            placeholder="Enter confirm password"
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
            <p>Sign up</p>
          </Button>
        </RHForm>

        <p className="text-center mt-5">
          If you already have an account, please login{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
          >
            here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
