import { useState } from "react";
import { storage } from "../firebase";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";                 

const HelpingMaterial = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = () => {
    if (!file) {
      alert("Select File");
      return;
    }

    const storageRef = ref(
      storage,
      `materials/${Date.now()}-${file.name}`   
    );

    const uploadTask = uploadBytesResumable(
      storageRef,
      file
    );    

    uploadTask.on(
      "state_changed",

      () => {},

      (error) => {
        console.log(error);
      },    

      async () => {
        const downloadURL = await getDownloadURL(
          uploadTask.snapshot.ref
        );

        setUrl(downloadURL);       

        alert("File Uploaded Successfully");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Upload Helping Material
        </h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-4 rounded-lg"
          accept=".pdf,.ppt,.pptx,image/*,video/*"
        />    

        <button
          onClick={handleUpload}
          className="w-full mt-5 bg-blue-600 text-white py-4 rounded-xl text-xl"
        >
          Upload File
        </button>   

        {url && (
          <div className="mt-6">  

            <a
              href={url}
              target="_blank"
              className="bg-green-600 text-white px-5 py-3 rounded-lg inline-block"
            >
              Open File
            </a>

          </div>
        )}

      </div>

    </div>
  );
};

export default HelpingMaterial;