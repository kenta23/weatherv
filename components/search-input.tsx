import React from "react";
import { IoMdSearch } from "react-icons/io";
import { Input } from "./ui/input";

export default function SearchInput() {
  return (
    <div className="mx-auto flex items-center justify-center">
      <div className="w-[590px] bg-slate-600 flex items-center h-[50px] relative rounded-full">
        <IoMdSearch
          size={20}
          className="absolute text-[#9CB4C5] top-[26%] left-6"
        />
        <input
          type="text"
          placeholder="Search"
          className="indent-4 pl-8 placeholder:text-[#9CB4C5] text-black w-full h-full focus:outline-none rounded-full"
          aria-label="Search"
        />
      </div>
    </div>
  );
}
