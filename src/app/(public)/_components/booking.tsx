'use client';
import {  IconMail,  IconPhone } from '@tabler/icons-react';
import React from 'react';

export default function Booking() {
  return (
    <div
      className="
        w-full text-white py-16 px-4 
        bg-contain bg-center bg-no-repeat
        min-h-[600px]
        bg-black
        bg-[url('/map.png')]
      "
    >

        
      {/* BOOK A CALL TITLE */}
      {/* <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
          BOOK A CALL TODAY!
        </h1>
        <p className="text-gray-300 mt-2 max-w-xl">
          Book a FREE discovery call to discuss your project and challenges and 
          find the best approach for executing it.
        </p>
      </div> */}

      {/* CALENDAR */}
      <div className="flex justify-center mt-8">
        <div className="rounded-lg p-6 w-[350px] md:w-[420px] backdrop-blur">
          <iframe
            src="https://calendly.com/emanuel-ypgh/30min?month=2025-02"
            className="w-full  h-[60rem] rounded"
          />
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="mt-8 flex flex-col items-center text-center">
        <h2 className="text-4xl font-semibold tracking-wide mb-4">
          PREFER TO REACH US DIRECTLY?
        </h2>

        <p className="text-gray-300 mb-6">
          Feel free to shoot us an email or call at any time.
        </p>

        <div className="flex flex-col gap-3 text-md text-gray-200">
<div className="justify-center flex  gap-6 mt-4 w-full max-w-xl">

  {/* LEFT COLUMN — PHONES */}
  <div className="flex flex-col gap-3">
    <p className="flex items-center gap-2">
      <IconPhone /> <span>+251911407401</span>
    </p>

    <p className="flex items-center gap-2">
      <IconPhone /> <span>+17033955235</span>
    </p>
  </div>

 

  {/* RIGHT COLUMN — EMAILS */}
  <div className="flex flex-col gap-3 justify-center">
    <p className="flex items-center gap-2">
      <IconMail />
      <a href="mailto:info@zareinnovations.com" className="">
 info@zareinnovations.com
      </a>
    </p>

 
  </div>

</div>


          <p className="flex items-center gap-2  mt-4 ">
            <img src="/assets/location.svg" alt="location" className="inline-block w-5 h-5" />    5501 Seminary Road, Falls Church VA, 22041,Unit 1710 South, 22041, United States
          </p>
          <p className="flex items-center gap-2  ">
          <img src="/assets/location.svg" alt="location" className="inline-block w-5 h-5" />      Meskel Flower, Astor Plaza 3rd Floor, Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </div>
  );
}
