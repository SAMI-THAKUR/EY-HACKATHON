import { useState } from "react";
const Generate = () => {
  const [file, setFile] = useState(null);
  return (
    <div className="flex justify-center items-center h-screen ">
      <label
        className="cursor-pointer p-2 rounded-md bg-slate-950 text-white "
        htmlFor="file"
      >
        Upload file
      </label>
      <input
        value={file}
        onChange={(e) => {
          setFile(e.target.value);
        }}
        id="file"
        className="hidden"
        type="file"
      />
    </div>
  );
};

export default Generate;
