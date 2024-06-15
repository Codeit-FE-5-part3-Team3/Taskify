"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CardDropDown from "./CardDropDown";
import Image from "next/image";
import CardTag from "../card-tag/CardTag";
import { CommentForm } from "../comment-form/CommentForm";
import CommentList from "../comment-list/CommentList";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import CustomAvatar from "@/components/custom-avatar/CustomAvatar";
import formatDate from "@/util/formatDate";

export default function Jeb({ children, cardData, column, comments }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col w-[314px] h-full p-5 bg-white border-2 border-[#D9D9D9] rounded-md gap-2.5">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="gap-6 max-w-full w-fit">
        <DialogHeader>
          <div className="flex justify-between pr-4">
            <DialogTitle className="text-2xl font-bold">
              {cardData.title}
            </DialogTitle>
            <CardDropDown cardId={cardData.id} setter={setIsOpen} />
          </div>
        </DialogHeader>
        <div className="flex gap-6 ">
          <div className="flex flex-col gap-4">
            <div className="flex gap-5 w-full">
              <div className="w-fit h-fit shrink-0">
                <div className="rounded-full bg-violet-50 w-fit h-fit px-2 py-1 gap-1.5 flex items-center ">
                  <div className="w-1.5 h-1.5 bg-violet-100 rounded-full"></div>
                  <span className="text-violet-100">{column.title}</span>
                </div>
              </div>

              {cardData !== undefined && cardData.tags.length > 0 && (
                <div className="flex">
                  <div className="w-5 h-8 border-l border-gray-300"></div>
                  <CardTag cards={cardData} />
                </div>
              )}
            </div>
            <span>{cardData?.description}</span>

            {cardData.imageUrl && (
              <div className="relative w-[450px] h-[263px]">
                <Image
                  src={cardData.imageUrl}
                  alt={cardData.description}
                  fill
                  objectFit="contain"
                />
              </div>
            )}
            <CommentForm
              cardId={cardData.id}
              columnId={column.id}
              dashboardId={column?.dashboardId}
            />
            <CommentList comments={comments} />
          </div>
          <div className="w-[200px] h-[155px] rounded-lg border border-gray-300 p-4 flex flex-col gap-2">
            <span className="text-xs font-semibold">담당자</span>
            {cardData.assignee ? (
              <div className="flex gap-2 items-center">
                <Avatar>
                  <CustomAvatar
                    imgUrl={cardData.assignee.profileImageUrl}
                    size={34}
                    userId={cardData.assignee.id}
                    nickname={cardData.assignee.nickname}
                  />
                </Avatar>
                <span className="text-xm">{cardData.assignee.nickname}</span>
              </div>
            ) : (
              <div className="text-gray-400">없음</div>
            )}
            <div className=" flex flex-col ">
              <span className="text-xs font-semibold">마감일</span>
              {cardData.dueDate ? (
                <div>{formatDate(cardData.dueDate)}</div>
              ) : (
                <div> -- . -- . -- </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
