"use client";

import Image from "next/image";

interface Props {
  page?: string;
}

export default function SearchBar({ page }: Props) {
  const newParams = "page";

  return (
    <div className="w-full border border-gray-300 px-4 py-2 rounded-md flex gap-2">
      <button>
        <Image src={"/dot-bo-ki.svg"} width={24} height={24} alt="search" />
      </button>
      <input className="border-none outline-none grow" placeholder={"검색"} />
    </div>
  );
}
