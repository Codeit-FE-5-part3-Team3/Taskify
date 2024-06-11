import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AddCardButton() {
  return (
    <Button className=" bg-white border-2 border-[#D9D9D9]">
      <Image src="/add_box_large.svg" alt="add" width={22} height={22} />
    </Button>
  );
}
