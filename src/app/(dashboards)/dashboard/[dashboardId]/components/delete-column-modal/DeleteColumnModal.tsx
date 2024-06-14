import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

interface Props {
  title: string;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteColumnModal({
  title,
  onCancel,
  onDelete,
}: Props) {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <b>{title}</b> 칼럼을 삭제하시겠습니까??
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>
        <AlertDialogAction asChild>
          <button className="bg-red-500 text-white" onClick={onDelete}>
            삭제
          </button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
