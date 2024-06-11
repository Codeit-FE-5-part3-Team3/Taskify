"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

type invitation = {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  inviteAccepted: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function InvitationTuple({
  invitation,
}: {
  invitation: invitation;
}) {
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const handleAccept = async () => {
    // 수락 로직
    console.log("Invitation accepted");
    setIsAcceptDialogOpen(false);
  };

  const handleReject = async () => {
    // 거절 로직
    console.log("Invitation rejected");
    setIsRejectDialogOpen(false);
  };

  return (
    <div className="w-full grid grid-cols-3 items-center py-5">
      <span>{invitation.dashboard.title}</span>
      <span>{invitation.inviter.nickname}</span>
      <div className="flex gap-3 text-sm">
        <AlertDialog
          open={isAcceptDialogOpen}
          onOpenChange={setIsAcceptDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <button
              onClick={() => setIsAcceptDialogOpen(true)}
              className="text-white px-7 bg-violet-100 rounded h-8"
            >
              수락
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-50">
            초대를 수락하시겠습니까?
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <button
                  onClick={() => setIsAcceptDialogOpen(false)}
                  className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]"
                >
                  취소
                </button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  onClick={handleAccept}
                  className="bg-[#5534da] text-white px-[46px] py-3.5 rounded-lg hover:bg-[#4524ca]"
                >
                  수락
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog
          open={isRejectDialogOpen}
          onOpenChange={setIsRejectDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <button
              onClick={() => setIsRejectDialogOpen(true)}
              className="rounded border border-gray-300 px-7 h-8"
            >
              거절
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-50">
            초대를 거절하시겠습니까?
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <button
                  onClick={() => setIsRejectDialogOpen(false)}
                  className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]"
                >
                  취소
                </button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  onClick={handleReject}
                  className="bg-red-500 text-white px-[46px] py-3.5 rounded-lg hover:bg-red-600"
                >
                  거절
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
