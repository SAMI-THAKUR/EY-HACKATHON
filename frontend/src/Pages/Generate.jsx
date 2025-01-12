import { useState } from "react";

const Generate = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      // Redirect to Streamlit application
      window.location.href = 'http://localhost:8501';
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <label
        className="cursor-pointer p-2 rounded-md bg-slate-950 text-white "
        htmlFor="file"
      >
        Upload file
      </label>
      <input
        onChange={handleFileUpload}
        id="file"
        className="hidden"
        type="file"
        accept=".pdf,.doc,.docx"
      />
    </div>
  );
};

export default Generate;
