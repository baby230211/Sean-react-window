import React from "react";
import { ThumbUpIcon, DotsHorizontalIcon } from "@heroicons/react/solid";

export const Card = ({ style }) => {
  /* container */
  return (
    <div style={style}>
      <div className="p-4 max-w-md border mx-auto mt-5">
        {/* Header */}
        <div className="flex  items-center">
          {/* Avatar */}
          <div>
            <img
              className="w-10 h-10 rounded-full "
              src="https://picsum.photos/200/300"
              alt=""
            />
          </div>
          {/* body */}
          <div className="flex-1 flex-col ">
            {/* title */}
            <div className="text-left pl-2">Kraftsman：Coding 職人塾</div>
            {/* description */}
            <div className="text-left pl-2">
              <span>33分鐘</span>
              {/* icon */}
              <span></span>
            </div>
          </div>
          <div>
            {/* button action */}

            <button>
              <DotsHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="text-left">
          <span>
            順應轉職潮流，不少轉職成功的經驗也跟著分享出來。我個人蠻喜歡看這種成長歷程紀錄，會有一種勵志感
            😄 這個 Repository 整理了前後端入門筆記、自學路線以及求職紀錄。
          </span>
        </div>
        {/* footer */}
        <div className="flex">
          {/* leftBlock */}
          <div className="flex-1 items-center">
            <button className="flex items-center mx-auto">
              <ThumbUpIcon className="h-5 w-5 text-blue-500" />讚
            </button>
          </div>
          <div className="flex-1">
            <button>留言</button>
          </div>
          <div className="flex-1">
            <button>分享</button>
          </div>
        </div>
      </div>
    </div>
  );
};
