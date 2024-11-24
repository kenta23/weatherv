'use client';

import React from 'react'
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';
import { IoLocationSharp } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';

export default function LoadingUi() {
    return (
        <div className="text-white px-8 w-full overflow-x-hidden min-h-screen h-full">
          {/**SEARCH INPUT */}
          <div className="mx-auto flex relative items-center justify-center">
            <div className="w-[590px] bg-slate-600 flex items-center h-[50px] relative z-50 rounded-full">
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
    
          {/**WEather description */}
          <div className="mt-[45px] mx-[20px] md:mx-[55px] lg:mx-[85px]">
            <div className="flex items-start w-auto h-auto gap-3">
              <IoLocationSharp size={27} color="#D13535" />
              <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[170px]" />
              </div>
            </div>
    
            <div className="relative  flex flex-col py-2 gap-[80px] items-center justify-center">
              <div className="w-full">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <Skeleton className="size-28 rounded-full" />
                  <div className="flex mt-2 flex-col items-center gap-1">
                    <Skeleton className="w-[100px] h-4" />      
                    <Skeleton className="h-2 w-9" />
          
                  </div>
                </div>
              </div>
    
              <div className="flex items-center h-[120px] justify-center md:w-full lg:w-[90%]">
                <div className="flex w-full gap-3 justify-around">
                  {/**PRESSURE, HUMIDITY, VISIBLITY, WIND */}
                  {Array.from({ length: 4 }).map((item) => (
                    <div className="flex flex-col gap-2 items-center" key={item as number}>
                      <div className="flex gap-1 items-center">
                        <Skeleton className="size-4 rounded-full" />
                        <Skeleton className="w-[80px] h-4" />
                      </div>
    
                      <Skeleton className="w-[96px] h-4" />
                    </div>
                  ))}
                </div>
              </div>
    
              <div className="absolute px-4 hidden md:block right-0 md:right-3 lg:right-16 w-auto md:w-[300px] top-16">
                {Array.from({ length: 3 }).map((temp, index) => (
                  <div
                    key={index}
                    className="flex text-start gap-2 mb-3 my-2 justify-start items-center"
                  >
                    <Skeleton className="size-4 rounded-full" />
                    <Skeleton className="w-[80px] h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          {/**WEATHER HIGHLIGHTS */}
          <div className="space-y-6 mx-12 overflow-x-hidden w-full">
            <Skeleton className="w-[100px] h-4" />
    
            <div className="flex justify-center flex-wrap w-full items-center">
              <div className="grid items-start gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full justify-center">
                {Array.from({ length: 7 }).map((item, index) => (
                  <Skeleton
                    key={index}
                    className={cn(
                      `h-[240px] backdrop-invert bg-white/15 rounded-xl drop-shadow-xl px-3 py-2 backdrop-opacity-10 col-span-full sm:col-span-1 w-[340px]`,
                      {
                        "col-start-1 col-span-full row-start-4 md:col-start-3 md:row-start-3":
                          index === 6,
                      }
                    )}
                  >
                    <div className="flex flex-col h-full gap-1 ">
                      <Skeleton className="w-[100px] h-4" />
    
                      <div className="flex items-center justify-center my-auto">
                        <Skeleton className="size-20" />
                      </div>
                    </div>
                  </Skeleton>
                ))}
    
                <div className="h-[300px] backdrop-invert bg-white/15 rounded-xl drop-shadow-xl px-3 py-2 backdrop-opacity-10  col-start-1 col-span-full md:col-span-2 ">
                  <div className="flex flex-col h-full gap-1 ">
                    <Skeleton className='size-4 w-[85px]'/>
    
                    <div className="flex items-center justify-center my-auto">
                      <Skeleton className="size-28" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* ONE WEEK WEATHER FORECAST */}
          <div className="space-y-6 mx-12 mt-12 w-full">
            <Skeleton className='w-[200px] h-4'/>
    
            <div className='grid-cols-1 sm:grid md:flex gap-6 w-full overflow-x-auto'>
              {Array.from({ length: 6 }).slice(1).map((item, index) => (
                <Skeleton
                  className="bg-[#E8EDF0]/20 rounded-[20px] backdrop-opacity-10 w-[280px] h-[265px] px-1 py-2  rounded[20px]"
                  key={index}
                ></Skeleton>
              ))}
            </div>
    
    
          </div>
        </div>
      );
}
