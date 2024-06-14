import {
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ColumnCreateForm } from "../column-create-form/ColumnCreateForm";

export default function CreateColumnModal({
  dashboardId,
}: {
  dashboardId: number;
}) {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>새 컬럼 생성</AlertDialogTitle>
      </AlertDialogHeader>
      <ColumnCreateForm dashboardId={dashboardId} />
    </>
  );
}
