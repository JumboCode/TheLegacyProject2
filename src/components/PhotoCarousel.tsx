import React, { useState, useEffect, useRef } from "react";
import Image from "next/legacy/image";

type PhotoProps = {
  filePath: string;
};

interface PhotoCarouselParams {
  imagePaths: string[];
}

const PhotoCarousel = ({ imagePaths }: PhotoCarouselParams) => {
  const [photos, setPhotos] = useState<PhotoProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [show, setShow] = useState<number>(1);
  const widthRef = useRef<HTMLHeadingElement>(null);

  const [elemWidth, setElemWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setElemWidth(widthRef.current ? widthRef.current.offsetWidth : 0);
      const showVal = widthRef.current
        ? Math.floor(widthRef.current.offsetWidth / 250)
        : 1;
      setShow(showVal || 1);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const carouselHeight = elemWidth / show;
  const carouselPad = 20;

  const nextIndex = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevIndex = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  useEffect(() => {
    setPhotos(
      imagePaths.map((path) => ({
        filePath: path,
      }))
    );
  }, [imagePaths]);

  return (
    <div className="flex w-full flex-col place-content-center gap-y-8 py-6">
      <div className="relative flex items-center justify-center">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          className="hover:cursor-pointer"
          onClick={() => prevIndex()}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M41.0933 44.24L28.8799 32L41.0933 19.76L37.3333 16L21.3333 32L37.3333 48L41.0933 44.24Z"
            fill="#000022"
          />
        </svg>

        <div
          className="relative flex w-full flex-row justify-between overflow-hidden ease-in-out"
          style={{ height: carouselHeight - carouselPad }}
          ref={widthRef}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.filePath}
              className={
                "absolute aspect-square h-full select-none object-cover transition-all"
              }
              style={{
                left:
                  ((index - activeIndex + photos.length) % photos.length) *
                  (carouselHeight + carouselPad / 2),
              }}
            >
              <Image
                className="object-cover"
                layout="fill"
                src={photo.filePath}
                alt={"object cover"}
              />
            </div>
          ))}
        </div>
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          onClick={() => nextIndex()}
          className="hover:cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.9067 19.76L35.1201 32L22.9067 44.24L26.6667 48L42.6667 32L26.6667 16L22.9067 19.76Z"
            fill="#000022"
          />
        </svg>
      </div>
    </div>
  );
};

export default PhotoCarousel;
