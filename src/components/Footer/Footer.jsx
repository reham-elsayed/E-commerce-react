
"use client";

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function Foot() {
  return (
    <div className="mt-5">
    <Footer bgDark>
      <div className="w-full">
       
        <div className="w-full bg-gray-700 text-white px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="E-commerce™" year={2024} className="text-white"/>
          <div className="mt-4 flex text-white space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} className="text-white"  aria-label="facebook" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-white"  aria-label="instgram" />
            <Footer.Icon href="#" icon={BsTwitter} className="text-white"  aria-label="twitter" />
            <Footer.Icon href="#" icon={BsGithub} className="text-white"  aria-label="github" />
            <Footer.Icon href="#" icon={BsDribbble} className="text-white"   aria-label="dribble"/>
          </div>
        </div>
      </div>
    </Footer>
    </div>
  );
}
