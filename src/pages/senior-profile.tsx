import type { NextPage } from "next";
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

enum FileType {
  Document = "/icons/icon_doc.png",
  Pdf = "/icons/icon_pdf.png",
  Audio = "/icons/icon_audio.png"
}

type fileProps =  {
    name: string
    URL: string
    type: FileType
    last_modified: Date
};

const SearchBar = ({
  data,
  setData
}:{
  data: fileProps[],
  setData: Dispatch<SetStateAction<fileProps[]>>
}) => {

  const [searchInput, setSearchInput] = useState("");
  const originalData = useRef(data);
  //search files by name only
  //const [searchParam] = useState(["name"]);

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    if (searchInput.length === 0) {
      setData(originalData.current);
    } else if (searchInput.length > 0){
      //function to filter files
      const filteredData = originalData.current.filter(x => {
        return x.name.includes(searchInput);
      });
      setData(filteredData);
      //data.name.toLowerCase().includes(searchInput.toLowerCase());
    }
  };


    
  return (
    <input className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
           type="text" placeholder="Search" onChange={handleChange} value={searchInput} />
  );
}

const AddFile = ({
    data,
    setData
}: any) => {

  const addFile = (e: any) => {
    e.preventDefault();
    setData([...data, {name: "new_file.pdf", type: FileType.Pdf, URL:"", last_modified: new Date()}])
  }

  return (
    <div className="flex flex-col items-center justify-center border hover:cursor-pointer hover:bg-slate-500 hover:text-white" onClick={addFile}>
    <Image src='/icons/icon_plus.png' alt="icon" width={50} height={60}/>
    <p>Add file</p>
    </div>
  );
}

const FileGrid: NextPage = () => {

  //function to create new files
    const [ data, setData ] = useState<fileProps[]>([
      {name: "example_file5.mp3", type: FileType.Audio, URL: "", last_modified: new Date()},
      {name: "example_file6.pdf", type: FileType.Pdf, URL: "", last_modified: new Date()},
      {name: "example_file7.doc", type: FileType.Document, URL : "", last_modified: new Date()},
      {name: "example_file8.mp3", type: FileType.Audio, URL : "", last_modified: new Date()},
    ]);
    //useEffect(() => {
   //   setData();
   // }, []) 

    return (
        <main className="container flex min-h-screen flex-col p-4">
          <h1 className="text-[3rem] leading-normal text-gray-700">File Grid</h1>
          <SearchBar data={data as fileProps[]} setData={setData}/>
          <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-4">
            <AddFile data={data} setData={setData}/>
           
           {data.map(({ name, URL, type, last_modified}: fileProps) =>
              <File key={name} name={name} URL={URL} type={type} last_modified={last_modified}/>)}
           
          </div>
        </main>
    );
}

export default FileGrid;

const File = ({
    name, 
    URL,
    type,
    last_modified,
}: fileProps) => {
  const formattedDate: () => string = () => {
    const dateStr = `Last modified on ${last_modified.toDateString()} at ${last_modified.toTimeString()}`;
    return dateStr.substring(0, dateStr.indexOf("G"));
  }

  return (
    <section className="flex flex-col justify-center rounded border p-3">
      <Image className="object-scale-down h-10" width={35} height={35} src={type} alt="file icon"></Image>
      <h2 className="text-lg text-gray-700">{name}</h2>
      {/* <p className="text-sm text-gray-600">{type}</p> */}
      {/* <p className="text-sm text-gray-600">{formattedDate()}</p> */}
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={URL}
      >
        Link
      </a>
    </section>
  );
};