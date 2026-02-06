import React from "react";
import banner from "../assets/banner.png";
import bannerSmall from "../assets/banner_sm.png";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative">
      <img
        src={banner}
        alt="banner"
        className="w-full hidden md:block rounded"
      />
      <img src={bannerSmall} alt="banner" className="w-full md:hidden" />
      <div
        className="absolute inset-0 flex flex-col items-center md:items-start justify-start md:justfy-center 
      pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24 pt-24 md:pt-12 lg:pt-14"
      >
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left  
        max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg-leading-15"
        >
          Knit What You Like
        </h1>
        <div className="mt-6 font-medium items-center">
          <Link
            to={"/products"}
            className="flex justify-center items-center px-7 md:px-9 py-3 bg-primary-500 
        hover:bg-primary-700 transition rounded text-primary-50 cursor-pointer"
          >
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
