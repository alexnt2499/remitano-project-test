import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useReactRedux";
import AppLayout from "../../layouts/AppLayout";
import * as yup from "yup";
import ShareCard from "../../components/ShareCard";
import { useQuery } from "react-query";
import { apiShared } from "../../apis";
import Spinner from "../../components/Spinner";
import { SharedType } from "../../apis/types/SharedType";
import { useInView } from "react-intersection-observer";

const SharedPage = () => {
  const [page, setPage] = useState(1);
  const { authData } = useAppSelector((state) => state.auth);
  const { ref, inView } = useInView();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [listVideo, setListVideo] = useState<SharedType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await apiShared.getListShared(
        authData?.auth_token ?? "",
        page,
        5
      );
      if (data?.shared?.length === 0) {
        setHasNextPage(false);
        return;
      } else {
        setListVideo((old) => [...old, ...(data?.shared ?? [])]);
        setHasNextPage(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authData?.auth_token) fetchData();
  }, [page]);

  useEffect(() => {
    if (inView) {
      if (hasNextPage) setPage((old) => old + 1);
    }
  }, [inView]);

  return (
    <AppLayout>
      <div className="m-5 py-10 px-20 max-md:m-0 max-md:px-4 max-lg:px-5 max-md:shadow-none max-w-[1280px] w-[100vw]">
        <div className="flex flex-col justify-center items-center w-full ">
          {listVideo.length === 0 ? (
            <p>There are currently no videos shared</p>
          ) : (
            listVideo?.map((item, index) => {
              if (index === listVideo.length - 1) {
                return (
                  <div key={item.id} className="w-full">
                    <ShareCard item={item} />
                    <button
                      className="w-full h-2"
                      ref={ref}
                      disabled={!hasNextPage || isLoading}
                    >
                      {isLoading ? (
                        <Spinner />
                      ) : hasNextPage ? (
                        "Load Newer"
                      ) : (
                        "Nothing more to load"
                      )}
                    </button>
                  </div>
                );
              }
              return (
                <div key={item.id} className="w-full">
                  <ShareCard item={item} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SharedPage;
