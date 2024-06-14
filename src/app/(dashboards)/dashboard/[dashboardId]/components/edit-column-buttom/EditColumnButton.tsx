import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import EditColumnModal from "../edit-column-modal/EditColumnModal";

type EditColumnButtonProps = {
  columnId: number;
  title: string;
};

export function EditColumnButton({ columnId, title }: EditColumnButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Image src="/settings.svg" alt="settings" width={24} height={24} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-7">
        <EditColumnModal title={title} columnId={columnId} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
