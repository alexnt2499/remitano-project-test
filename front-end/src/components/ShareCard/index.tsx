import React, { FC } from "react";
import ReactPlayer from "react-player";
import { SharedType } from "../../apis/types/SharedType";

interface Props {
  item: SharedType;
}

const ShareCard: FC<Props> = ({ item }) => {
  return (
    <div className="grid grid-cols-2 w-full max-w-[1280px] gap-4 max-md:grid-cols-1 mb-10">
      <div className="w-full rounded-sm overflow-hidden bg-slate-600">
        <ReactPlayer width="auto" height={400} url={item.url} />
      </div>
      <div className="w-full">
        <h3 className="font-bold text-primary-500 text-xl">{item.name}</h3>
        <p>
          <span className="font-bold text-primary-500">Shared by:</span>{" "}
          {item.user?.name}
        </p>
        <p className="font-bold text-primary-500">Description: </p>
        <p className="">{item.description}</p>
      </div>
    </div>
  );
};

export default ShareCard;
