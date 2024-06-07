"use client";

import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function CreateDashboardModal() {
  const [dashboardName, setDashboardName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardName(e.target.value);
  };

  const handleSubmit = async () => {};

  return (
    <>
      <DialogHeader>
        <DialogTitle>새로운 대시보드</DialogTitle>
      </DialogHeader>
      <label htmlFor="dashboard-name">대시보드 이름</label>
      <input
        placeholder="뉴프로젝트"
        onChange={handleChange}
        value={dashboardName}
      />
      <DialogFooter>
        <DialogClose>취소</DialogClose>
        <button onClick={handleSubmit}>생성</button>
      </DialogFooter>
    </>
  );
}
