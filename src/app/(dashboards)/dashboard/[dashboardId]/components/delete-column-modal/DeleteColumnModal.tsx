import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

export default function DeleteColumnModal() {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>새 컬럼 생성</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogContent>
        <span>컬럼의 모든 카드가 삭제됩니다.</span>
      </AlertDialogContent>
      <AlertDialogFooter>
        <AlertDialogCancel className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]">
          취소
        </AlertDialogCancel>
        <AlertDialogAction
          type="submit"
          className="bg-[#5534da] text-white px-[46px] py-3.5 rounded-lg hover:bg-[#4524ca]"
        >
          삭제
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
