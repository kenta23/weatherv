'use client';

import { searchCity } from "@/actions/data";
import { useSearchCity } from "@/lib/query";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaMapPin } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useDebounce } from 'use-debounce';



export default function SearchInput() {
  const [text, setText] = useState<string>('');
  const [debouncedText] = useDebounce(text, 700);  
  const queryclient = useQueryClient();
  const {data, error, isPending } = useSearchCity(decodeURIComponent(debouncedText));
  const containerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  if (error) console.log(error);


  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    setText(e.target.value);

    if (debouncedText) {
      await queryclient.prefetchQuery({
        queryKey: ["searchCity"],
        staleTime: 0,
        queryFn: () => {
          const data = searchCity(decodeURIComponent(debouncedText));
          return data;
        },
      });
    }
  }


  function handleOutsideClick(e: MouseEvent) { 
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setText('');
  }
 }

 useEffect(() => { 
     document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
 }, [])


  //implement loading state when searching city
  return (
    <div className="mx-auto flex w-auto relative items-center justify-center">
      <div className="w-[265px] sm:w-[350px] md:w-[400px] lg:w-[590px] flex items-center h-[40px] sm:h-[50px] relative z-50 rounded-full">
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
          <div ref={containerRef} className="absolute px-6 py-2 rounded-lg w-full h-auto min-h-[55px] top-[105%] z-10 left-0  bg-white">
            {isPending ? (
              <p className="text-gray-400">Loading....</p>
            ) : (
              <div className="overflow-y-auto max-h-[250px]">
                {data !== undefined && data?.length ? (
                  data?.map((item, i) => (
                    <Link
                      href={`/city/${item?.local_names?.en}`}
                      key={i}
                      className="flex cursor-pointer hover:text-red-400 transition-colors group duration-150 ease-out pb-2 items-center  border-b-[#E5E7EB] border-b-[1px] justify-between gap-3"
                    >
                      <div className="flex gap-1 items-center">
                        <FaMapPin color="#FF6392" className="size-4 md:size-5" />
                        <h3 className="text-sm md:text-lg font-medium">
                          {item?.local_names?.en || item?.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-gray-400 flex gap-2 group-hover:text-red-200">
                          <p className="font-light text-[10px] md:text-sm">
                            lat: {item.lat || 0}{" "}
                          </p>
                          <p className="font-light text-[10px] md:text-sm">
                            lon: {item.lon || 0}
                          </p>
                        </div>
                       
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {pathname !== "/" && (
        <Link className="cursor-pointer absolute right-4 md:right-8 lg:right-12 hover:text-gray-100" href={"/"}>
          <p className="text-white text-[10px] sm:text-[12px] md:text-sm lg:text-xl">Home</p>
        </Link>
      )}
    </div>
  );
}
