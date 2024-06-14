import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CardCreateForm } from "../card-create-form/CardCreateForm";

type CreateCardModalProps = {
  dashboardId: number;
  columnId: number;
};

export default function CreateCardModal({
  dashboardId,
  columnId,
}: CreateCardModalProps) {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>할 일 생성</AlertDialogTitle>
      </AlertDialogHeader>
      <CardCreateForm dashboardId={dashboardId} columnId={columnId} />
    </>
  );
}
