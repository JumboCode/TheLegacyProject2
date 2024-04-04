import Link from "next/link";
import Image from "next/legacy/image";
import LivesReflected from "@public/landing/about/their_lives_reflected.png";
import SundaesSundays from "@public/landing/about/sundaes_sundays.png";
import PS1 from "@public/landing/about/parallel_stories1.png";
import PS2 from "@public/landing/about/parallel_stories2.png";
import PS3 from "@public/landing/about/parallel_stories3.png";

const AboutLayout = async () => {
  return (
    <div className="flex w-full flex-col justify-center gap-y-4 py-6">
      <span className="pt-6 text-center text-3xl font-semibold sm:text-left sm:text-4xl">
        Our Story
      </span>
      <p className="mt-8 font-bold leading-7">The Legacy Project’s Origin</p>
      <p className="leading-7">
        The concept of{" "}
        <strong>
          <span style={{ color: "#742B1A" }}>The Legacy Project (TLP)</span>
        </strong>{" "}
        began in 2018, when{" "}
        <strong>
          <span style={{ color: "#742B1A" }}>Arielle Galinsky</span>
        </strong>
        , a high school junior at the time, spent her time working at a local
        senior community in her Massachusetts hometown. Her role allowed her to
        interact with the residents, which she greatly enjoyed, yet she always
        left her shift with a strong desire to learn more about the stories of
        the seniors she met. With this strong curiosity, paired with a deep
        sense of regret she felt having lost her own grandfathers at a young
        age, Arielle decided to spearhead{" "}
        <strong>
          <span style={{ color: "#742B1A" }}>TLP</span>
        </strong>{" "}
        as a personal project. <br />
        <br />
        The initiative encompassed conducting thorough interviews of 18
        residents living in the community, with the intention to hold a ceremony
        at the finale of the project to provide her older friends with the
        opportunity to share their stories with their families. When the
        COVID-19 pandemic hit, Arielle pivoted, and decided the best way to
        preserve the 18 captivating stories of the seniors she interviewed was
        through prose.{" "}
      </p>
      <div className="mt-6 flex h-80 justify-between gap-x-20">
        <div className="aspect-w-16 aspect-h-9 flex flex-col">
          <Image
            src={LivesReflected}
            alt="Their Lives Reflected"
            className="flex aspect-auto object-contain p-12"
          />{" "}
          <p className="mt-5 h-20 text-center text-sm">
            <span>
              <Link
                href="https://www.amazon.com/Their-Lives-Reflected-Treasury-Captured/dp/B08SYTBDGC"
                className="italic text-[#742B1A] hover:underline"
              >
                Their Lives Reflected: A Treasury of Life Stories Captured
                Through The Legacy Project
              </Link>
            </span>{" "}
            was published 2021 to showcase and celebrate their life accounts,
            both for the seniors and their families.
          </p>
        </div>
        <div className="flex flex-col">
          <Image
            src={SundaesSundays}
            alt="Sundaes & Sundays"
            className="flex aspect-auto object-contain p-12"
          />
          <p className="mt-5 h-20 text-center text-sm">
            <span>
              <Link
                href="https://www.amazon.com/Sundaes-Sundays-Collection-Histories-captured/dp/B0CPKP2TX2/ref=sr_1_1?crid=1FVJFMUPSDRQC&keywords=sundaes+and+sundays&qid=1707221197&sprefix=sundaes+and+sundays%2Caps%2C187&sr=8-1"
                className="italic text-[#742B1A] hover:underline"
              >
                Sundaes & Sundays: A Collection of Life Histories as captured by
                The Legacy Project at Tufts: Volume 1
              </Link>
            </span>{" "}
            is a collection of twelve life stories of older adults residing in a
            Massachusetts senior living community.
          </p>
        </div>
      </div>
      <p className="mt-8 font-bold leading-7">Parallel Stories Unite</p>
      <p className="leading-7">
        Little did she know that, in the state over from her,{" "}
        <strong>Katie Furey</strong>- a sophomore in college who was home for
        the pandemic- started a similar project of her own. Katie had always
        been close with her grandmother, Mary, who was living in a nursing home
        at the time of the pandemic. When Katie and her family would visit Mary
        and her neighbors from outside the window of the nursing home, waving
        frantically through the glass and chatting on the phone, Katie wished
        there was a way for young people like herself to connect more deeply
        with these wonderful people on the other side of the glass who were
        experiencing a loneliness perhaps even more pronounced than the
        loneliness Katie and her peers were facing as the pandemic escalated.
        <br />
        <br />
        <em>The United Nations Millennium Fellowship</em> being hosted through
        Tufts University presented a perfect opportunity for Katie to put her
        idea into action. Using the program’s framework, Katie partnered with
        the
        <em>Little Sisters of the Poor home</em> in{" "}
        <em>Enfield, Connecticut</em>. Katie met around ten older adults from
        the home on Zoom, connecting with them and learning tidbits of their
        life stories, which she is working on compiling as a series of
        vignettes.
      </p>
      <div className="mt-6 flex justify-between gap-x-12">
        <Image src={PS1} alt="parallel stories 1" className="flex" />
        <Image src={PS2} alt="parallel stories 2" className="flex" />
        <Image src={PS3} alt="parallel stories 3" className="flex" />
      </div>
      <p className="mt-8 font-bold leading-7">Collaboration and Expansion</p>
      <p className="leading-7">
        Arielle and Katie met in 2020, quickly connecting over their aligned
        passions to build intergenerational connections, provide a platform for
        local seniors to share their stories, and preserve such histories
        through their collective love for writing.
        <br />
        <br />
        They decided to start the <strong>Tufts Legacy Project</strong>, a
        chapter of <strong>The Legacy Project</strong> based out of{" "}
        <strong>Tufts University</strong> in Medford, Massachusetts, with the
        goal of connecting college students one-on-one with older adults living
        in the communities of Medford and Somerville.
        <br />
        <br />
        When Katie decided to join the Millennium Fellowship for a second year,
        she met Wanda Schlumpf, a sophomore at Tufts, who was similarly
        dedicated to the value of storytelling. Wanda took on the project with
        her and joined the Tufts TLP chapter as a founding member. Together, the
        three women helped to build it into an organization of nearly 30
        students passionate about empowering local seniors with the platform to
        amplify their stories.
      </p>
      <p className="mt-8 font-bold leading-7">TLP’s National Vision</p>
      <p className="leading-7">
        Having watched the Tufts chapter grow over the past two years, Arielle,
        Katie, and Wanda decided to found TLP as a nonprofit organization with
        the goal of spreading their mission across the country: preserving
        stories of seniors who might not otherwise have the opportunity to.
        <br />
        <br />
        TLP seeks to build sustainable, intergenerational connections as a means
        to combat social isolation, preserve the life histories of older adults,
        engage young individuals in revolutionizing perspectives on aging, and
        ensure that every old adult - regardless of background - has the
        opportunity to share their experiences.
      </p>
    </div>
  );
};
export default AboutLayout;
