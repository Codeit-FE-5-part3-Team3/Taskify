"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { ColumnEditForm } from "../column-edit-form/ColumnEditForm";

import { useState } from "react";
import { DeleteColumnButton } from "../delete-column-button/DeleteColumnButton";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";

type EditColumnButtonProps = {
  columnId: number;
  title: string;
};

export function EditColumnButton({ columnId, title }: EditColumnButtonProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelClick = () => {
    setIsDeleteModalOpen(true);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <AlertDialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Image src="/settings.svg" alt="settings" width={24} height={24} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-7">
          <AlertDialogHeader>
            <AlertDialogTitle>컬럼 관리</AlertDialogTitle>
          </AlertDialogHeader>
          <ColumnEditForm columnId={columnId} title={title}>
            <Button
              variant="ghost"
              className="p-0"
              onClick={handleDelClick}
              type="button"
            >
              <span className="text-gray-300">삭제하기</span>
            </Button>
          </ColumnEditForm>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="p-7">
          <AlertDialogHeader>
            <AlertDialogTitle>너 정말로 삭제할거니?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteModalOpen(false)}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
