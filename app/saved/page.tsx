import SearchInput from '@/components/search-input'
import Link from 'next/link'
import React from 'react'
import { CgMenuMotion } from 'react-icons/cg';
import { IoChevronBack } from 'react-icons/io5'

export default function Page() {

  return (
    <div className="w-full text-white h-full min-h-screen">
      <SearchInput />
      <div className="mt-[45px] mx-[20px] md:mx-[55px] lg:mx-[85px]">
        <Link className="space-x-2 flex items-center" href={"/"}>
          <IoChevronBack size={22} />
          <span className="text-lg">Go Back</span>
        </Link>

        <div className="mt-14 w-full px-4 flex items-start ">
          <div className="flex pb-2 justify-between items-center  min-w-[600px] max-w-[670px] border-[#ffff] border-b-[1px]">
            <h1 className='text-2xl'>Tokyo, Japan</h1>

            {/**TEMP */}
            
            <div className='flex items-center gap-2'>
                    <h2 className='text-[28px]'>32°C</h2>
                    <p className=''>8C</p>
            </div>


            <CgMenuMotion className='' size={30} cursor={'pointer'}/>

          </div>
        </div>


      </div>
    </div>
  );
}
