"use client";

import NewChapterForm from "@components/NewChapterForm";

const StartChapter = () => {
  return (
    <div className="mb-8 min-h-screen">
      <div className="py-3">
        <div className="py-2 text-4xl font-bold">Start a Chapter</div>
        <div className="pt-6 text-2xl font-semibold">
          Start a chapter of the Legacy Project, Inc. on your campus today!
        </div>
      </div>
      <div className="mb-8 gap-y-3 text-xl">
        <p className="py-3">
          This form serves to identify student leaders who are interested in
          starting a chapter of The Legacy Project, Inc. (TLP) at their US-based
          college or university.{" "}
        </p>
        <p className="py-3">
          TLP is a student-led organization that seeks to{" "}
          <strong>
            {" "}
            foster intergenerational connections between students and older
            adults
          </strong>{" "}
          in their local communities. Furthermore, TLP is dedicated to
          documenting and amplifying the life stories of the older generation to
          ensure that their legacies are preserved for years to come.
        </p>
        <p className="py-3">
          We encourage all to apply, <strong> no experience necessary, </strong>{" "}
          and we will be in contact soon to explore this opportunity.{" "}
        </p>
        <p className="py-3">
          {" "}
          For additional information, feel free to reach out at{" "}
          <strong> exec@thelegacyproject.org </strong>
        </p>
      </div>
      <NewChapterForm />
    </div>
  );
};

export default StartChapter;
