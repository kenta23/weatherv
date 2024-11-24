import Image from 'next/image'
import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#5AA9E6] ">
      <div className='flex items-center justify-center gap-4 flex-col'>
        <Image
          loading="eager"
          quality={100}
          src={"/logo.png"}
          width={150}
          height={200}
          alt={"Logo"}
        />
        <h1 className='font-medium text-2xl text-white'>WeatherV</h1>
      </div>
    </div>
  );
}
