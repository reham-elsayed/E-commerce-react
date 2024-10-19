
"use client";

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function Foot() {
  return (
    <div className="mt-5">
    <Footer bgDark>
      <div className="w-full">
       
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="E-commerce™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook}  aria-label="facebook" />
            <Footer.Icon href="#" icon={BsInstagram}  aria-label="instgram" />
            <Footer.Icon href="#" icon={BsTwitter}  aria-label="twitter" />
            <Footer.Icon href="#" icon={BsGithub}  aria-label="github" />
            <Footer.Icon href="#" icon={BsDribbble}   aria-label="dribble"/>
          </div>
        </div>
      </div>
    </Footer>
    </div>
  );
}
