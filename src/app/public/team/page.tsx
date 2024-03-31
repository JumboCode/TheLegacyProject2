import Link from "next/link";
import Image from "next/legacy/image";
import MEET_TLP_1 from "@public/icons/team/meet_tlp1.png";
import MEET_TLP_2 from "@public/icons/team/meet_tlp2.png";
import MEET_TLP_3 from "@public/icons/team/meet_tlp3.png";
import OUR_TEAM from "@public/icons/team/our_team.png";
import PRESS_1 from "@public/icons/team/press1.png";
import PRESS_2 from "@public/icons/team/press2.png";

const PublicLayout = async () => {
  const press1 =
    "https://www.tuftsdaily.com/article/2022/02/tufts-legacy-project-builds-intergenerational-connections-one-story-at-a-time";
  const press2 =
    "https://generations.asaging.org/accurate-legacies-left-intergenerational-work";
  return (
    <div className="justify-center4 flex w-full flex-col">
      <span className="pt-6 text-center text-3xl font-semibold sm:text-left sm:text-4xl">
        Meet TLP
      </span>
      <p className="mt-7 leading-7">
        The Legacy Project, Inc. (TLP) connects college students with local
        elders in their community with the purpose of building strong
        intergenerational relationships and documenting the life histories of
        seniors, ensuring that their legacies are preserved for years to come.
        Join an ever-growing network of college students across the country
        passionate about telling stories, and form a Legacy Project chapter at
        your school today.
      </p>
      <div className="mt-6 flex gap-x-12">
        <Image src={MEET_TLP_1} alt="meet_tlp_1" className="flex" />
        <Image src={MEET_TLP_2} alt="meet_tlp_2" className="flex" />
        <Image src={MEET_TLP_3} alt="meet_tlp_3" className="flex" />
      </div>
      <span className="mb-6 mt-8 pt-6 text-center text-3xl font-semibold sm:text-left sm:text-4xl">
        Our Team
      </span>
      <Image src={OUR_TEAM} alt="our_team" />
      <span className="pt-6 text-center text-3xl font-semibold sm:text-left sm:text-4xl">
        Press
      </span>
      <div className="mb-10 mt-6 flex gap-x-12">
        <div>
          <Image src={PRESS_1} className="h-48 w-96" alt="press_1" />
          <Link className="hover:underline" href={press1}>
            Tufts Legacy Project builds intergenerational connections, one story
            at a time
          </Link>
        </div>
        <div>
          <Image src={PRESS_2} className="h-48 w-96" alt="press_2" />
          <Link className="hover:underline" href={press2}>
            Intergenerational Connection Key to Leaving Accurate Legacies
          </Link>
        </div>
        <div />
      </div>
    </div>
  );
};
export default PublicLayout;
