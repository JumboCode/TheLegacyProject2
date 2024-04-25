"use client";

import "src/styles/animation.css";
import React, { useState, useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";
import clsx from "clsx";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

type PhotoProps = {
  filePath: string;
};

interface PhotoCarouselParams {
  imagePaths: string[];
}

interface PhotoProps2 {
  original: string;
  thumbnail: string;
}

const NickImage = ({ path }: { path: string }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    // <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <div className={"aspect-square h-full object-cover"}>
      {/* <Skeleton className="h-full" /> */}
      <Image
        className={loaded ? "object-cover" : "invisible"}
        src={path}
        alt="Gallery"
        layout="fill"
        data-loaded="false"
        // onLoad={() => console.log("loaded")}
        onLoadingComplete={() => {
          console.log("loaded complete");
          setLoaded(true);
        }}
      />
      {!loaded && (
        <Skeleton
          className="h-full w-full"
          // style={{
          //   width: "calc((100% / 4) - (50 * 3))",
          //   height: "calc((100% / 4) - (50 * 3))",
          // }}
        />
      )}
    </div>
    // </SkeletonTheme>
  );
};

const PhotoCarousel = ({ imagePaths }: PhotoCarouselParams) => {
  // const [photos, setPhotos] = useState<PhotoProps[]>([]);z
  const [loaded, setLoaded] = React.useState(false);

  const photos = React.useMemo(
    () =>
      imagePaths.map((path) => (
        <SwiperSlide key={path} className="w-full">
          <NickImage path={path} />
        </SwiperSlide>
      )),
    [imagePaths]
  );

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

  return (
    // <div className="flex w-full flex-col place-content-center gap-y-8 py-6">
    <Swiper
      modules={[Navigation, Scrollbar, A11y]}
      slidesPerView={4}
      spaceBetween={64}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="flex h-96 w-full justify-between"
    >
      {photos}
      {/* <SwiperSlide>
        <NickImage path={imagePaths[0] ?? ""} />
      </SwiperSlide>
      <SwiperSlide>
        <NickImage path={imagePaths[1] ?? ""} />
      </SwiperSlide>
      <SwiperSlide>
        <NickImage path={imagePaths[2] ?? ""} />
      </SwiperSlide>
      <SwiperSlide>
        <NickImage path={imagePaths[3] ?? ""} />
      </SwiperSlide> */}
      {/* <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide> */}

      {/* {photos.map((photo, index) => (
        <div key={photo.filePath} className="aspect-square h-full object-cover">
          <Image
            className="object-cover"
            layout="fill"
            src={photo.filePath}
            alt={"object cover"}
          />
        </div>
      ))} */}
    </Swiper>
    // {/* <div className="relative flex items-center justify-center">
    //   <svg
    //     width="64"
    //     height="64"
    //     viewBox="0 0 64 64"
    //     fill="none"
    //     className="hover:cursor-pointer"
    //     onClick={() => prevIndex()}
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       d="M41.0933 44.24L28.8799 32L41.0933 19.76L37.3333 16L21.3333 32L37.3333 48L41.0933 44.24Z"
    //       fill="#000022"
    //     />
    //   </svg>

    //   <div
    //     className="relative flex w-full flex-row justify-between overflow-hidden ease-in-out"
    //     style={{ height: carouselHeight - carouselPad }}
    //     ref={widthRef}
    //   >
    //     {photos.map((photo, index) => (
    //       <div
    //         key={photo.filePath}
    //         className={
    //           "absolute aspect-square h-full select-none object-cover transition-all"
    //         }
    //         style={{
    //           left:
    //             ((index - activeIndex + photos.length) % photos.length) *
    //             (carouselHeight + carouselPad / 2),
    //         }}
    //       >
    //         <Image
    //           className="object-cover"
    //           layout="fill"
    //           src={photo.filePath}
    //           alt={"object cover"}
    //         />
    //       </div>
    //     ))}
    //   </div>
    //   <svg
    //     width="64"
    //     height="64"
    //     viewBox="0 0 64 64"
    //     fill="none"
    //     onClick={() => nextIndex()}
    //     className="hover:cursor-pointer"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       d="M22.9067 19.76L35.1201 32L22.9067 44.24L26.6667 48L42.6667 32L26.6667 16L22.9067 19.76Z"
    //       fill="#000022"
    //     />
    //   </svg>
    // </div> */}
    // </div>
  );
};

// export const NickImage = ({
//   css,
//   ...props
// }: { css?: any } & Omit<ImageProps, "onLoadingComplete">) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isSkeleton, setIsSkeleton] = useState(false);

//   return (
//     <div
//       // style={.skeleton}
//       className={clsx({ skeleton: isSkeleton })}
//       // className={clsx({ skeleton: isSkeleton })}
//     >
//       <div
//         style={{
//           "&.fade": {
//             transition: "opacity 200ms ease",
//             opacity: 0,
//             '&[data-loaded="true"]': {
//               opacity: 1,
//             },
//           },
//           ...css,
//         }}
//         // className={clsx({ fade: transition })}
//         data-loaded={isLoaded}
//         /* remove skeleton after transition ends */
//         onTransitionEnd={(event) =>
//           event.propertyName === "opacity" && setIsSkeleton(false)
//         }
//       >
//         <Image
//           quality={90}
//           layout="intrinsic"
//           {...props}
//           onLoadingComplete={() => setIsLoaded(true)}
//           alt={"nani"}
//         />
//       </div>
//     </div>
//   );
// };

export default PhotoCarousel;
