"use client";

import PhotoCarousel from "@components/PhotoCarousel";
import Image from "next/legacy/image";
import Link from "next/link";
import Logo from "@public/icons/logo.svg";

const HomePage = () => {
  const MEET_TLP = "/public/team/";
  const START_A_CHAPTER = "/public/start-chapter";

  return (
    <main className="flex flex-col">
      <div className="relative z-10 flex flex-col content-center items-center gap-y-6 overflow-hidden rounded bg-[#E7DCD0] px-6 py-[80px] sm:px-12">
        {/* Hero Section and Action Items Buttons */}
        <div className="h-28 w-72 self-start">
          <Image src={Logo} alt="logo" className="object-contain" />
        </div>
        <div className="flex w-full flex-row items-center self-start">
          <div className="flex flex-col items-center gap-[24px] lg:mr-[20px] lg:items-start">
            <h1 className="mb-[10px] text-left text-4xl font-semibold sm:text-6xl">
              Everyone has a story that&apos;s worth preserving.
            </h1>
            <p className="text-md text-left tracking-easy md:text-lg lg:text-left xl:text-xl">
              The Legacy Project documents the stories of the elder generation
              to ensure that their legacies are preserved for years to come.
            </p>
          </div>
        </div>
        {/* Action Items Buttons */}
        <div className="flex justify-center">
          <Link
            className="w-fit gap-[20px] rounded-xl bg-dark-teal px-6 py-4 text-white hover:-translate-y-0.5 hover:bg-dark-teal"
            href={START_A_CHAPTER}
          >
            Start A Chapter
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center gap-y-4 py-6">
        <span className="text-center text-3xl font-semibold sm:text-left sm:text-4xl">
          About Us
        </span>
        <p className="leading-7">
          The Legacy Project, Inc. (TLP) connects college students with local
          elders in their community with the purpose of building strong
          intergenerational relationships and documenting the life histories of
          seniors, ensuring that their legacies are preserved for years to come.
        </p>

        <p className="leading-7">
          Join an ever-growing network of college students across the country
          passionate about telling stories, and form a Legacy Project chapter at
          your school today.
        </p>
        <PhotoCarousel
          imagePaths={[
            "/gallery/Tufts Legacy-5.jpg",
            "/gallery/Tufts Legacy-7.jpg",
            "/gallery/Tufts Legacy-270.jpg",
            "/gallery/Tufts Legacy-264.jpg",
            "/gallery/Tufts Legacy-265.jpg",
            "/gallery/Tufts Legacy-261.jpg",
            "/gallery/Tufts Legacy-255.jpg",
            "/gallery/Tufts Legacy-258.jpg",
          ]}
        />
        <div className="flex justify-center">
          <Link
            className="w-fit rounded-xl bg-dark-teal px-6 py-4 text-white hover:-translate-y-0.5 hover:bg-dark-teal"
            href={MEET_TLP}
          >
            Meet TLP
          </Link>
        </div>
      </div>
    </main>
  );
};

HomePage.displayName = "public";

export default HomePage;
