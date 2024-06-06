import ToolBarButton from "@/components/ui/tool-bar-button/ToolBarButton";
import Image from "next/image";

export default function DashboardToolBar() {
  return (
    <div className="flex gap-4">
      <ToolBarButton>
        <Image src={"/settings.svg"} width={20} height={20} alt="settings" />
        관리
      </ToolBarButton>
      <ToolBarButton>
        <Image src={"/add_box.svg"} width={20} height={20} alt="invite" />
        초대하기
      </ToolBarButton>
    </div>
  );
}
