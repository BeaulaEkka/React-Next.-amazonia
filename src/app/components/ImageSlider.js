"use client";
import { useEffect, useState } from "react";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";

export default function ImageSlider() {
  const photos = [
    {
      url: "/images/hero_1.jpg",
      id: 1,
      title: "household",
    },
    {
      url: "/images/hero_2.jpg",
      id: 2,
      title: "supplies",
    },
    {
      url: "/images/hero_3.jpg",
      id: 3,
      title: "books",
    },
    {
      url: "/images/hero_4.jpg",
      id: 4,
      title: "books",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === photos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 3000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const isLastSlide = prevIndex === photos.length - 1;
        const newIndex = isLastSlide ? 0 : prevIndex + 1;
        return newIndex;
      });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [photos.length]);

  return (
    <div className="max-w-[1920px] h-[500px] w-full mx-auto my-[-1rem]  relative group  ">
      <div
        style={{
          backgroundImage: `url(${photos && photos[currentIndex]?.url})`,
        }}
        className="w-full h-full bg-top bg-cover duration-500"
      ></div>
      {/* left Arrow */}
      <div className="hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* right arrow */}
      <div className="hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 "></div>
    </div>
  );
}
