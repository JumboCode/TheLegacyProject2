import React from "react";

const TestApi = () => {
  // FILE ROUTES
  const getFiles = async () => {
    const res = await fetch(
      "/api/file?" +
        new URLSearchParams({
          // id: "644dff1a1a4eadb12dc34055",
          // id: "644e06921a4eadb12dc34058",
          id: "644e0dd41a4eadb12dc3405a",
        }),
      {
        method: "GET",
      }
    );
    const files = await res.json();
    console.log(files);
  };
  const addFile = async () => {
    await fetch("/api/file/add", {
      method: "POST",
      body: JSON.stringify({
        // name: "Goals and Aspirations",
        // description: "Bob Ross's Life Goals",
        // fileType: "Google Docs",
        // lastModified: "",
        // url: "https://drive.google.com/drive/folders/1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a",
        // seniorId: "644dff1a1a4eadb12dc34055",
        // tags: ["Goals", "Aspirations", "Life"],

        // name: "Famous Paintings",
        // description: "Collection of Bob Ross's Paintings",
        // fileType: "PDF",
        // lastModified: "",
        // url: "https://drive.google.com/drive/folders/1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a",
        // seniorId: "644dff1a1a4eadb12dc34055",
        // tags: ["Art", "Life"],

        // name: "Spring Fling 2023 Setlist",
        // description: "Collection of Flo Rida",
        // fileType: "Google Docs",
        // lastModified: "",
        // url: "https://drive.google.com/drive/folders/1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a",
        // seniorId: "644e06921a4eadb12dc34058",
        // tags: ["Music", "Concert"],

        // name: "Biography",
        // description: "Flo Rida's Life",
        // fileType: "Google Docs",
        // lastModified: "",
        // url: "https://drive.google.com/drive/folders/1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a",
        // seniorId: "644e06921a4eadb12dc34058",
        // tags: ["Life", "Childhood", "Education"],

        name: "Biography",
        description: "Cool Guy's Life",
        fileType: "Google Docs",
        lastModified: "",
        url: "https://drive.google.com/drive/folders/1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a",
        seniorId: "644e0dd41a4eadb12dc3405a",
        tags: ["Life", "Childhood", "Education"],
      }),
    });
  };

  // SENIOR ROUTES
  const addSenior = async () => {
    await fetch("/api/seniors/add", {
      method: "POST",
      body: JSON.stringify({
        // name: "Bob Ross",
        // location: "Boston, MA",
        // description: "Lowkey Famous Painter",
        // students: ["644c28094869fe52b345b917"],
        // folder:
        //   "https://drive.google.com/drive/folders/1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a",

        // name: "Flo Rida",
        // location: "Florida",
        // description: "Spring Fling Performer",
        // students: ["644c28094869fe52b345b917"],
        // folder:
        //   "https://drive.google.com/drive/folders/1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a",

        name: "Cool Guy",
        location: "Coolest Place on Earth",
        description: "Just a Cool Dude",
        students: ["644c28094869fe52b345b917"],
        folder:
          "https://drive.google.com/drive/folders/1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a",
      }),
    });
  };
  const getSeniors = async () => {
    const res = await fetch("/api/seniors", {
      method: "GET",
    });
    const seniors = res.json();
    console.log(seniors);
  };

  // STUDENT ROUTES
  const getStudents = async () => {
    const res = await fetch("/api/students", {
      method: "GET",
    });
    const students = res.json();
    console.log(students);
  };

  return (
    <div className="m-10 flex h-full w-full flex-col gap-5">
      {/* FILE ROUTES */}
      <span className="tracking-wide text-3xl font-bold text-dark-gray">
        /api/file/
      </span>
      <button
        className="ease group relative z-30 inline-flex w-40 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gradient-to-b from-white to-gray-50 px-8 py-3 font-bold text-gray-500 transition-all duration-500 hover:from-gray-50 hover:to-white active:to-white"
        onClick={getFiles}
      >
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gray-100 group-active:bg-transparent"></span>
        <span className="absolute bottom-0 right-0 h-full w-0.5 bg-gray-100 group-active:bg-transparent"></span>
        GET
      </button>
      <button
        className="ease group relative z-30 inline-flex w-40 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gradient-to-b from-white to-gray-50 px-8 py-3 font-bold text-gray-500 transition-all duration-500 hover:from-gray-50 hover:to-white active:to-white"
        onClick={addFile}
      >
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gray-100 group-active:bg-transparent"></span>
        <span className="absolute bottom-0 right-0 h-full w-0.5 bg-gray-100 group-active:bg-transparent"></span>
        POST
      </button>

      {/* SENIOR ROUTES */}
      <span className="tracking-wide text-3xl font-bold text-dark-gray">
        /api/seniors/
      </span>
      <button
        className="ease group relative z-30 inline-flex w-40 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gradient-to-b from-white to-gray-50 px-8 py-3 font-bold text-gray-500 transition-all duration-500 hover:from-gray-50 hover:to-white active:to-white"
        onClick={getSeniors}
      >
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gray-100 group-active:bg-transparent"></span>
        <span className="absolute bottom-0 right-0 h-full w-0.5 bg-gray-100 group-active:bg-transparent"></span>
        GET
      </button>
      <button
        className="ease group relative z-30 inline-flex w-40 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gradient-to-b from-white to-gray-50 px-8 py-3 font-bold text-gray-500 transition-all duration-500 hover:from-gray-50 hover:to-white active:to-white"
        onClick={addSenior}
      >
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gray-100 group-active:bg-transparent"></span>
        <span className="absolute bottom-0 right-0 h-full w-0.5 bg-gray-100 group-active:bg-transparent"></span>
        POST
      </button>

      {/* STUDENT ROUTES */}
      <span className="tracking-wide text-3xl font-bold text-dark-gray">
        /api/students/
      </span>
      <button
        className="ease group relative z-30 inline-flex w-40 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gradient-to-b from-white to-gray-50 px-8 py-3 font-bold text-gray-500 transition-all duration-500 hover:from-gray-50 hover:to-white active:to-white"
        onClick={getStudents}
      >
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gray-100 group-active:bg-transparent"></span>
        <span className="absolute bottom-0 right-0 h-full w-0.5 bg-gray-100 group-active:bg-transparent"></span>
        GET
      </button>
    </div>
  );
};

export default TestApi;
