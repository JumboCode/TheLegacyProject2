// landingFooter for Landing Page

import React from "react";

const landingFooter = () => {
  return (
    <>
      <div className="pb-9 w-[659px] text-center bg-taupe">
        <p className="text-4xl font-bold font-serif text-[40px] px-[21.5px] leading-[56px]">
          The Legacy Project. We&apos;re here.
        </p>
        <br></br>
        <p className="font-normal text-lg font-serif opacity-80">
          We believe that the experiences and wisdom of our elders are valuable
          treasures that should be passed down to future generations. Join us in
          our effort to honor the past and shape the future by preserving the 
          stories of our elders</p>
        <br></br>
        <br></br>
        <div className="flex flex-col gap-3">
          <a href="mailto:arielle.galinsky@tufts.edu">
            <button className="bg-light-sage py-1.5 px-5 text-md rounded-lg duration-150 hover:-translate-y-0.5">
              ✉️  Email
            </button>
          </a>
          <a href="https://www.instagram.com/tuftslegacyproject/">
            <button className="bg-light-sage py-1.5 px-5 text-md rounded-lg duration-150 hover:-translate-y-0.5">
              🌿 Instagram
            </button>
          </a>
          
        </div>
        
      </div>
    </>
  );
};

export default landingFooter;