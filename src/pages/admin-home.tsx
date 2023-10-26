import type { GetServerSidePropsContext, NextPage } from "next";
import PhotoHeader from "@components/PhotoHeader";

import Image from "next/legacy/image";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { Approval, Senior, User } from "@prisma/client";
import React, {
  useCallback,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/router";
import TileGrid, { SeniorTile, StudentTile } from "@components/TileGrid";
import AddSenior from "@components/AddSenior";
import SearchBar from "@components/SearchBar";
import SortDropdown, { SortMethod } from "@components/SortDropdown";
import cn from "classnames";
import { prisma } from "@server/db/client";
import PendingCard from "@components/PendingCard";

type IAdminProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {
  redirect: undefined;
};

const tabs = ["Students", "Seniors", "Pending"] as const;
type Tabs = (typeof tabs)[number];

const Home: NextPage<IAdminProps> = ({
  me,
  students: initialStudents,
  pending: initialPending,
  deactivated: initialDeactivated,
  seniors: initialSeniors,
}) => {
  const [students, setStudents] = useState(initialStudents);
  const [pending, setPending] = useState(initialPending);
  const [_, setDeactivated] = useState(initialDeactivated);
  const [seniors, setSeniors] = useState(initialSeniors);

  const [selectedTab, setSelectedTab] = useState<Tabs>("Students");
  // TODO: implement sorting for seniors
  // const [sortMethod, setSortMethod] = useState<string>("By Name");

  const router = useRouter(); // call to refresh props
  const refreshData = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);

  const body = useMemo(() => {
    if (selectedTab === "Students") {
      return (
        <StudentBody
          students={students}
          setDeactivated={setDeactivated}
          setStudents={setStudents}
          refreshData={refreshData}
        />
      );
    } else if (selectedTab === "Seniors") {
      return (
        <SeniorBody
          seniors={seniors}
          students={students}
          setSeniors={setSeniors}
          refreshData={refreshData}
        />
      );
    } else if (selectedTab === "Pending") {
      return (
        <PendingBody
          pending={pending}
          setPending={setPending}
          setDeactivated={setDeactivated}
          setStudents={setStudents}
          refreshData={refreshData}
        />
      );
    }
  }, [pending, refreshData, selectedTab, seniors, students]);

  return (
    <div className="relative flex h-full w-full flex-col place-items-stretch p-8">
      <PhotoHeader admin={true} name={me.name} />
      <div
        className="flew-row / mb-6 flex h-[40px] justify-center border-b border-l 
                      border-r border-darker-tan bg-med-tan sm:justify-start"
      >
        {tabs.map((tab) => (
          <button
            disabled={tab === "Pending" && pending.length === 0}
            className={cn(
              "text-md w-full duration-150 hover:bg-darker-tan sm:w-auto",
              tab === selectedTab ? "bg-light-sage" : "bg-dark-tan"
            )}
            key={tab}
            onClick={() => setSelectedTab(tab)}
          >
            <div className="sm:px-auto px-6 duration-150 hover:-translate-y-0.5">
              {" "}
              {tab}{" "}
            </div>
          </button>
        ))}
      </div>
      {body}
    </div>
  );
};

function StudentBody({
  students,
  setDeactivated,
  setStudents,
  refreshData,
}: {
  students: User[];
  setDeactivated: Dispatch<SetStateAction<User[]>>;
  setStudents: Dispatch<SetStateAction<User[]>>;
  refreshData: () => void;
}) {
  const [filter, setFilter] = useState("");
  const [sortMethod, setSortMethod] = useState<SortMethod>("By Name");

  return (
    <>
      <div className="z-10 flex flex-row justify-between space-x-3 align-middle">
        <SearchBar setFilter={setFilter} />
        <SortDropdown sortMethod={sortMethod} setSortMethod={setSortMethod} />
      </div>
      <TileGrid>
        {students
          .filter(({ name }) => name?.includes(filter))
          .map((student) => (
            <div className="h-auto w-auto" key={student.id}>
              <StudentTile
                link={"/student/" + student.id}
                student={student}
                setDeactivated={setDeactivated}
                setStudents={setStudents}
                refreshData={refreshData}
              />
            </div>
          ))}
      </TileGrid>
    </>
  );
}

function SeniorBody({
  seniors,
  students,
  setSeniors,
  refreshData,
}: {
  seniors: Senior[];
  students: User[];
  setSeniors: React.Dispatch<React.SetStateAction<Senior[]>>;
  refreshData: () => void;
}) {
  const [filter, setFilter] = useState("");
  const [showAddSeniorPopUp, setShowAddSeniorPopUp] = useState<boolean>(false);
  const [seniorPatch, setSeniorPatch] = useState<string>("");
  const [sortMethod, setSortMethod] = useState<SortMethod>("By Name");

  return (
    <>
      <div className="z-10 flex flex-row justify-between space-x-3 align-middle">
        <SearchBar setFilter={setFilter} />
        <SortDropdown sortMethod={sortMethod} setSortMethod={setSortMethod} />
      </div>
      <TileGrid>
        <AddSenior
          seniors={seniors}
          students={students}
          setSeniors={setSeniors}
          showAddSeniorPopUp={showAddSeniorPopUp}
          setShowAddSeniorPopUp={setShowAddSeniorPopUp}
          seniorPatch={seniorPatch}
          setSeniorPatch={setSeniorPatch}
        />

        {seniors
          .filter(({ name }) => name?.includes(filter))
          .map((senior) => (
            <div key={senior.id}>
              <SeniorTile
                key={senior.id}
                link={"/senior/" + senior.id}
                senior={senior}
                setSeniors={setSeniors}
                refreshData={refreshData}
                setShowAddSeniorPopUp={setShowAddSeniorPopUp}
                setSeniorPatch={setSeniorPatch}
              />
            </div>
          ))}
      </TileGrid>
    </>
  );
}

function PendingBody({
  pending,
  setPending,
  setDeactivated,
  setStudents,
  refreshData,
}: {
  pending: User[];
  setPending: React.Dispatch<React.SetStateAction<User[]>>;
  setDeactivated: React.Dispatch<React.SetStateAction<User[]>>;
  setStudents: React.Dispatch<React.SetStateAction<User[]>>;
  refreshData: () => void;
}) {
  // TODO(nickbar01234) - Enforce that name field is non-null.
  return (
    <>
      {pending.map((user) => (
        <PendingCard key={user.id} name={user.name ?? ""} />
      ))}
    </>
    // <ul className="pb-9 min-h-screen">
    //   {pending.map((user) => (
    //     <li
    //       className="flex flex-row p-4 mb-8 gap-4 items-center rounded bg-white drop-shadow-md"
    //       key={user.id}
    //     >
    //       <Image
    //         alt="Profile Picture"
    //         src={user.image ?? "/profile/genericprofile.png"}
    //         className="rounded"
    //         width={48}
    //         height={48}
    //       />
    //       <div className="ml-1 flex-grow">
    //         <p className="text-lg font-bold text-neutral-600">{user.name}</p>
    //         <p className="text-md text-neutral-600">{user.email}</p>
    //       </div>
    //       <button
    //         title="Reject"
    //         className="flex h-8 p-5 items-center text-lg justify-center rounded \
    //                    text-white bg-tag-rust hover:bg-[#B76056] drop-shadow-md duration-150 hover:-translate-y-0.5"
    //         onClick={() => {
    //           fetch(`/api/student/${user.id}`, { method: "DELETE" });
    //           setPending((prev) => prev.filter((u) => u.id !== user.id));
    //           setDeactivated((prev) => [...prev, user]);
    //           refreshData();
    //         }}
    //       >
    //         Reject
    //       </button>
    //       <button
    //         title="Approve"
    //         className="flex h-8 p-5 items-center justify-center rounded \
    //                    text-white bg-dark-sage hover:bg-[#7F8E86] drop-shadow-md duration-150 hover:-translate-y-0.5 "
    //         onClick={() => {
    //           fetch(`/api/student/${user.id}/approve`, { method: "POST" });
    //           setPending((prev) => prev.filter((u) => u.id !== user.id));
    //           setStudents((prev) => [...prev, user]);
    //           refreshData();
    //         }}
    //       >
    //         Approve
    //       </button>
    //     </li>
    //   ))}
    // </ul>
  );
}

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!prisma) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!user.admin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const seniors = await prisma.senior.findMany();
  const users = await prisma.user.findMany();
  const students = users.filter(
    ({ approved }) => approved === Approval.APPROVED
  );
  const pending = users.filter(({ approved }) => approved === Approval.PENDING);
  const deactivated = users.filter(
    ({ approved }) => approved === Approval.DENIED
  );

  return {
    props: {
      me: user,
      students,
      pending,
      deactivated,
      seniors,
    },
  };
};
