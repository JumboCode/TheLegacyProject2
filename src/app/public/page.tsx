"use client";

import Head from "next/head";

import PhotoCarousel from "@components/PhotoCarousel";

import Button from "@components/Button";
import Image from "next/legacy/image";
import Link from "next/link";
import Logo from "@public/icons/logo.svg";

const HomePage = () => {
  // TODO: make env variables
  const chapterInitForm = "https://forms.gle/gBdmpsW6JFnYvwRf7";
  const chapterResources =
    "https://drive.google.com/drive/folders/1vw8rc5sU0bYJkgH75VZOjI6IF-XAWEmG?usp=share_link";
  const legacyInstagram =
    "https://instagram.com/thelegacyprojectus?igshid=MzRlODBiNWFlZA==";
  const MEET_TLP = "/public/team/";
  const START_A_CHAPTER = "/public/start-chapter";

  return (
    <main className="flex flex-col">
      <div className="relative z-10 flex flex-col content-center items-center gap-y-6 overflow-hidden rounded bg-[#E7DCD0] px-12 py-[80px]">
        {/* Hero Section and Action Items Buttons */}
        <div className="h-28 w-72 self-start">
          <Image src={Logo} alt="logo" className="object-contain" />
        </div>
        <div className="flex w-full flex-row items-center">
          <div className="flex flex-col items-center gap-[24px] lg:mr-[20px] lg:items-start">
            <h1 className="mb-[10px] text-left text-6xl/[75px] font-semibold">
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
        <PhotoCarousel />
        <div className="flex justify-center">
          <Link
            className="w-fit rounded-xl bg-dark-teal px-6 py-4 text-white hover:-translate-y-0.5 hover:bg-dark-teal"
            href={MEET_TLP}
          >
            Meet TLP
          </Link>
        </div>
        <span className="pt-6 text-center text-3xl font-semibold sm:text-left sm:text-4xl">
          Our Story
        </span>
        <p className="leading-7">
          The concept of{" "}
          <span className="font-bold text-[#742B1A]">
            The Legacy Project (TLP)
          </span>{" "}
          began in 2018, when{" "}
          <span className="font-bold text-[#742B1A]">Arielle Galinsky</span>, a
          high school junior at the time, spent her time working at a local
          senior community in her Massachusetts hometown. Her role allowed her
          to interact with the residents, which she greatly enjoyed, yet she
          always left her shift with a strong desire to learn more about the
          stories of the seniors she met. With this strong curiosity, paired
          with a deep sense of regret she felt having lost her own grandfathers
          at a young age, Arielle decided to spearhead{" "}
          <span className="font-bold text-[#742B1A]">TLP</span> as a personal
          project.
        </p>

        <p className="leading-7">
          The initiative encompassed conducting thorough interviews of 18
          residents living in the community, with the intention to hold a
          ceremony at the finale of the project to provide her older friends
          with the opportunity to share their stories with their families. When
          the COVID-19 pandemic hit, Arielle pivoted, and decided the best way
          to preserve the 18 captivating stories of the seniors she interviewed
          was through prose.
        </p>
      </div>
    </main>
  );
};

HomePage.displayName = "public";

export default HomePage;
