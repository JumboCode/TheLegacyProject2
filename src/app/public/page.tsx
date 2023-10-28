"use client";

import Head from "next/head";

import PhotoCarousel from "@components/PhotoCarousel";
import LandingFooter from "@components/LandingFooter";
import FlowerBox from "@components/FlowerBox";

import Button from "@components/Button";
import Image from "next/legacy/image";

const HomePage = () => {
  // TODO: make env variables
  const chapterInitForm = "https://forms.gle/gBdmpsW6JFnYvwRf7";
  const chapterResources =
    "https://drive.google.com/drive/folders/1vw8rc5sU0bYJkgH75VZOjI6IF-XAWEmG?usp=share_link";
  const legacyInstagram =
    "https://instagram.com/thelegacyprojectus?igshid=MzRlODBiNWFlZA==";

  return (
    <>
      <main className="z-0 flex min-h-screen w-screen flex-col px-[40px]">
        <FlowerBox>
          {/* Hero Section and Action Items Buttons */}
          <div className="flex w-full flex-row items-center md:px-[40px] lg:px-[60px]">
            <div className="flex flex-col items-center gap-[20px] lg:mr-[20px] lg:items-start">
              <h1 className="mb-[10px] text-center font-serif text-3xl font-semibold lg:text-left lg:text-4xl">
                Everyone has a story that&apos;s worth preserving.
              </h1>
              <p className="text-md text-center font-serif tracking-easy md:text-lg lg:text-left xl:text-xl">
                The Legacy Project, Inc. (TLP) connects college students with
                local elders in their community with the purpose of building
                strong intergenerational relationships and documenting the life
                histories of seniors, ensuring that their legacies are preserved
                for years to come.
              </p>

              <p className="text-md text-center font-serif tracking-easy md:text-lg lg:text-left xl:text-xl">
                Join an ever-growing network of college students across the
                country passionate about telling stories, and form a Legacy
                Project chapter at your school or university today. Fill out the
                form below and we will be in touch soon about next steps!
              </p>
            </div>

            <span className="relative hidden aspect-square h-[200px] w-[200px] grow-0 lg:flex">
              <Image
                src="/landing/legacy-logo.png"
                alt="A drawing of an older woman and a young boy enjoying ice cream cones together."
                layout="fill"
                objectFit="cover"
              />
            </span>
          </div>
          {/* Action Items Buttons */}

          <div className="flex w-full flex-row flex-wrap place-items-center justify-center gap-[20px]">
            <Button
              text="Start a Chapter"
              color="bg-tag-rust"
              hover="hover:bg-dark-rust"
              link={chapterInitForm}
            />
            <Button
              text="TLP Chapter Resources"
              color="bg-tag-rust"
              hover="hover:bg-dark-rust"
              link={chapterResources}
            />
            <Button
              text="TLP Instagram"
              color="bg-tag-rust"
              hover="hover:bg-dark-rust"
              link={legacyInstagram}
            />
          </div>
        </FlowerBox>
        <div className="flex w-full flex-col justify-center gap-y-4 px-[40px] py-[20px]">
          <span className="text-center font-serif text-3xl font-semibold sm:text-left sm:text-4xl">
            About Us
          </span>
          <p className="font-serif leading-7">
            The concept of The Legacy Project (TLP) began in 2018, when Arielle
            Galinsky, a high school junior at the time, spent her time working
            at a local senior community in her Massachusetts hometown. Her role
            allowed her to interact with the residents, which she greatly
            enjoyed, yet she always left her shift with a strong desire to learn
            more about the stories of the seniors she met. With this strong
            curiosity, paired with a deep sense of regret she felt having lost
            her own grandfathers at a young age, Arielle decided to spearhead
            TLP as a personal project. The initiative encompassed conducting
            thorough interviews of 18 residents living in the community, with
            the intention to hold a ceremony at the finale of the project to
            provide her older friends with the opportunity to share their
            stories with their families. When the COVID-19 pandemic hit, Arielle
            pivoted, and decided the best way to preserve the 18 captivating
            stories of the seniors she interviewed was through prose. Arielle
            published Their Lives Reflected: A Treasury of Life Stories Captured
            Through The Legacy Project in 2021 to showcase and celebrate their
            life accounts, both for the seniors themselves and their families.
          </p>

          <p className="font-serif leading-7">
            Little did she know that, in the state right next over, Katie Furey,
            a sophomore in college home for the pandemic, started a similar
            project of her own. Katie had always been close with her
            grandmother, Mary, who was living in a nursing home at the time of
            the pandemic. When Katie and her family would visit Mary and her
            neighbors from outside the window of the nursing home, waving
            frantically through the glass and chatting on the phone, Katie
            wished there was a way for young people like herself to connect more
            deeply with these wonderful people on the other side of the glass
            who were experiencing a loneliness perhaps even more pronounced than
            the loneliness Katie and her peers were facing as the pandemic
            ramped up. The United Nations Millennium Fellowship being hosted
            through Tufts University presented a perfect opportunity for Katie
            to put her idea into action. Using the program’s framework, Katie
            partnered with the Little Sisters of the Poor home in Enfield,
            Connecticut. Katie met around ten older adults from the home on
            Zoom, connecting with them and learning tidbits of their life
            stories, which she is working on compiling as a series of vignettes.
          </p>

          <div className="flex flex-col gap-y-4 bg-light-moss p-[20px]">
            <p className="font-serif leading-7">
              Arielle and Katie met in 2020, quickly connecting over their
              aligned passions to build intergenerational connections provide a
              platform for local seniors to share their stories, and preserve
              such histories through their collective love for writing. They
              decided to start the Tufts Legacy Project, a chapter of The Legacy
              Project based out of Tufts University in Medford, Massachusetts
              which seeks to bond college students 1:1 with older adults living
              in the host communities of Medford and Somerville. When Katie
              decided to join the Millennium Fellowship for a second year, she
              met Wanda Schlumpf, a sophomore at Tufts, who was similarly
              dedicated to the value of storytelling. Wanda took on the project
              with her and joined the Tufts TLP chapter as a founding member.
              Together, the three women helped to build it into an organization
              of nearly 30 students passionate about empowering local seniors
              with the platform to amplify their stories.
            </p>

            <p className="font-serif leading-7">
              Having watched the Tufts chapter grow over the past two years,
              Arielle, Katie, and Wanda decided to establish TLP as a nonprofit
              organization with the goal of spreading TLP’s mission across the
              country - preserving stories of seniors who might not otherwise
              have the opportunity. TLP seeks to build sustainable,
              intergenerational connections as a means to combat social
              isolation, preserve the life histories of older adults, engage
              young individuals in revolutionizing perspectives on aging, and
              ensure that every old adult- regardless of background - has the
              opportunity to share their experiences.
            </p>
          </div>
        </div>

        <PhotoCarousel />
        <LandingFooter />
      </main>
    </>
  );
};

HomePage.displayName = "public";

export default HomePage;
