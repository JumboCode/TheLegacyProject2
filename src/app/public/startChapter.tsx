import NewChapterForm from "@components/NewChapterForm";



const startChapter = () => {
  return (
    <div className="px-20">
      <div className="grid place-items-center py-3">
        <div className="py-3 text-3xl font-bold">Start a Chapter</div>
        <div className="text-lg font-semibold">
          Start a chapter of the Legacy Project, Inc. on your campus today!
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default startChapter;
