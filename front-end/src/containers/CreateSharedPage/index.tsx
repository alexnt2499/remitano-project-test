import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import RHInput from "../../components/RHForm/RHInput";
import config from "../../configs/api-config";
import { useAppDispatch, useAppSelector } from "../../hooks/useReactRedux";
import { selectAuth } from "../../store/authReducer";
import RHForm from "../../components/RHForm";
import AppLayout from "../../layouts/AppLayout";
import RHTextarea from "../../components/RHForm/RHTextarea";
import { apiShared } from "../../apis";
import { toast } from "react-toastify";

const CreateSharedValidationSchema = yup.object({
  name: yup.string().required("Name field cannot be left blank"),
  url: yup.string().required("URL field cannot be left blank"),
  description: yup.string().required("Description field cannot be left blank"),
});

const CreateShared = () => {
  const dispatch = useAppDispatch();
  const { authData } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any, e: any) => {
    setIsLoading(true);
    try {
      await apiShared.createShared(
        authData?.auth_token ?? "",
        data.name,
        data.url,
        data.description
      );
      setIsLoading(false);
      toast.success(`You create share video successful`, {});
    } catch (error: any) {
      console.log(error?.response?.data);

      let errorMsg = "Opoos something went wrong please try again";
      if (error?.response?.data["name"])
        errorMsg = "name " + error?.response?.data["name"][0];
      if (error?.response?.data["url"])
        errorMsg = "url " + error?.response?.data["url"][0];
      if (error?.response?.data["description"])
        errorMsg = "description " + error?.response?.data["description"][0];

      toast.error(`${errorMsg}`, {});

      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="w-[100vw] mt-8 flex justify-center items-center relative z-0">
        <div className="w-[520px] max-md:bg-transparent max-md:p-6 max-lg:p-8 p-10 z-[100] shadow-2xl max-md:shadow-none">
          <RHForm
            defaultValues={{}}
            onSubmit={onSubmit}
            validationSchemaParams={CreateSharedValidationSchema}
          >
            <RHInput
              name="name"
              labelText="Title"
              placeholder="Enter title of video sharing"
              containerClassName="mt-5"
            />
            <RHInput
              name="url"
              labelText="URL"
              placeholder="Enter URL of video sharing"
              containerClassName="mt-5"
            />

            <RHTextarea
              name="description"
              labelText="Description"
              placeholder="Enter description of video sharing"
              containerClassName="mt-5"
            />
            <Button
              type="submit"
              className={`w-full bg-primary-500 ${
                isLoading ? "opacity-60" : "opacity-100"
              } flex justify-center items-center py-3 mt-5 rounded-md text-white font-bold`}
              disabled={isLoading}
              is_loading={isLoading}
              data-cy="submit"
            >
              <p>Create shared</p>
            </Button>
          </RHForm>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateShared;
