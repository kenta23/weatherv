'use client';

import { searchCity } from "@/actions/data";
import { useSearchCity } from "@/lib/query";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaMapPin } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useDebounce } from 'use-debounce';



export default function SearchInput() {
  const pathname = usePathname();
  const [text, setText] = useState<string>('');
  const [debouncedText] = useDebounce(text, 500);  
  const queryclient = useQueryClient();
  const {data, error, isPending } = useSearchCity(decodeURIComponent(debouncedText));

if (error) console.log(error);


  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    setText(e.target.value);

    if (debouncedText) {
      await queryclient.prefetchQuery({
        queryKey: ["searchCity"],
        queryFn: () => {
          const data = searchCity(decodeURIComponent(debouncedText));
          return data;
        },
      });
    }
  }

  //implement loading state when searching city
  return (
    <div className="mx-auto flex relative items-center justify-center">
      <div className="w-[590px] bg-slate-600 flex items-center h-[50px] relative z-50 rounded-full">
        <IoMdSearch
          size={20}
          className="absolute text-[#9CB4C5] top-[26%] left-6"
        />
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          value={text}
          className="indent-4 pl-8 placeholder:text-[#9CB4C5] text-black w-full h-full focus:outline-none rounded-full"
          aria-label="Search"
        />

        {/**Search suggestion list */}

        {text.length > 0 && (
          <div className="absolute px-6 py-2 rounded-lg w-full h-auto min-h-[55px] top-[105%] z-10 left-0  bg-white">
            {isPending ? (
              <p>Loading....</p>
            ) : (
              <div className="overflow-y-auto max-h-[250px]">
               {data && data?.length > 0 ? data?.map((item, i) => (
                   <Link href={`/city/${item.local_names.en}`}  key={i} className="flex cursor-pointer hover:text-red-400 transition-colors group duration-150 ease-out pb-2 items-center  border-b-[#E5E7EB] border-b-[1px] justify-between gap-3">
                       <div className="flex gap-1 items-center">
                         <FaMapPin color="#FF6392" className="" size={18} />
                         <h3 className="text-[17px] font-medium">
                            {item.local_names.en}
                         </h3>
                       </div>
     
                       <div className="flex items-center gap-2">
                         <div className="text-gray-400 flex gap-2 group-hover:text-red-200">
                           <p className="font-light text-sm">lat: {item.lat || 0} </p>
                           <p className="font-light text-sm">lon: {item.lon  || 0}</p>
                         </div>
                         {/* <FaLocationArrow color="#9e2632" size={20} /> */}
                       </div>
                     </Link>
               )) : (
                 <p>No results found</p>
               )}
              </div>
            )}
          </div>
        )}
      </div>

      {pathname === "/" && (
        <div className="absolute text-white right-12">
          <Link href={"/saved"} className="">
            <p>Saved Cities</p>
          </Link>
        </div>
      )}
    </div>
  );
}
