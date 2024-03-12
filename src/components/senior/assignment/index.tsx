import { Prisma, User } from "@prisma/client";
import React from "react";
import { Dropdown } from "@components/selector";
import { compareUser, fullName } from "@utils";
import { patchSenior } from "@api/senior/[id]/route.client";
import { useRouter } from "next/navigation";

interface AssignmentProps {
  editable: boolean;
  senior: Prisma.SeniorGetPayload<{
    include: { Files: true; chapter: { include: { students: true } } };
  }>;
}

const Assignment = (props: AssignmentProps) => {
  const { senior } = props;
  const router = useRouter();
  const students = React.useMemo(
    () => senior.chapter.students.sort(compareUser),
    [senior.chapter.students]
  );

  const getAssignments = () =>
    students.filter((student) => senior.StudentIDs.includes(student.id));

  const [assigned, setAssigned] = React.useState(() => getAssignments());

  return (
    <div className="flex flex-wrap gap-2">
      {props.editable && (
        <Dropdown<User>
          header="Assign student"
          elements={students}
          selected={assigned}
          setSelected={setAssigned}
          display={(user) => fullName(user)}
          onSave={async () => {
            await patchSenior({
              body: {
                firstname: senior.firstname,
                lastname: senior.lastname,
                location: senior.location,
                description: senior.description,
                StudentIDs: assigned.map((user) => user.id),
              },
              seniorId: senior.id,
            });
            router.refresh();
          }}
        />
      )}
      {getAssignments().map((student) => (
        <div
          key={student.id}
          className="rounded-3xl bg-amber-red px-4 py-1.5 text-white"
        >
          {student.name}
        </div>
      ))}
    </div>
  );
};

export default Assignment;
