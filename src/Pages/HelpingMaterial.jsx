import { useState, useEffect } from "react";
import { storage } from "../firebase";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const HelpingMaterial = () => {
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [uploading, setUploading] = useState(false);              

  
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("materials")) || [];     
    setMaterials(saved);
  }, []);

  
  const handleUpload = () => {
    if (!file) return alert("Select File");  

    setUploading(true);

    const storageRef = ref(
      storage,
      `materials/${Date.now()}-${file.name}`     
    );

    const uploadTask = uploadBytesResumable(storageRef, file);   

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);      

        const newFile = {
          name: file.name,
          url,
          time: new Date().toLocaleString(),
        };     

        const updated = [...materials, newFile];  

        setMaterials(updated);
        localStorage.setItem("materials", JSON.stringify(updated));              

        setUploading(false);
        setFile(null);

        alert("Uploaded Successfully");
      }
    );
  };

  
  const deleteFile = (index) => {
    const updated = materials.filter((_, i) => i !== index);       
    setMaterials(updated);
    localStorage.setItem("materials", JSON.stringify(updated));   
  };

  
  const sendMessage = () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };     

    let botReply = "";

    if (input.toLowerCase().includes("html")) {
      botReply =
        "HTML is used to structure web pages using tags like <div>, <p>, <h1>.";      
    } else if (input.toLowerCase().includes("css")) {
      botReply =
        "CSS is used for styling websites like colors, layout and animations.";        
    } else if (input.toLowerCase().includes("react")) {
      botReply =
        "React is a JavaScript library for building UI components.";
    } else {
      botReply =
        "I am your AI study assistant. Ask me about HTML, CSS, JavaScript or React.";   
    }

    const botMsg = { role: "bot", text: botReply };      

    setChat([...chat, userMsg, botMsg]);    
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">

      
      <h1 className="text-4xl font-bold text-center mb-6">     
        📚 Helping Material Center + AI Assistant
      </h1>

      <div className="grid md:grid-cols-2 gap-6">  

        
        <div className="bg-white p-6 rounded-2xl shadow-xl">                                            

          <h2 className="text-2xl font-bold mb-4">          
            Upload Material
          </h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl"
          >
            {uploading ? "Uploading..." : "Upload"}         
          </button>

        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col">   

          <h2 className="text-2xl font-bold mb-4">
            🤖 AI Study Assistant
          </h2>

          <div className="h-64 overflow-y-auto border p-3 rounded-lg mb-3 bg-gray-50">    

            {chat.map((c, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  c.role === "user"
                    ? "text-right text-blue-600"
                    : "text-left text-green-600"     
                }`}
              >
                <p>{c.text}</p>
              </div>
            ))}

          </div>

          <div className="flex gap-2">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}         
              placeholder="Ask AI..."
              className="flex-1 border p-2 rounded-lg"
            />

            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4 rounded-lg"
            >
              Send
            </button>

          </div>

        </div>

      </div>

      
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-xl">   

        <h2 className="text-2xl font-bold mb-4">   
          📁 Uploaded Materials
        </h2>

        {materials.length === 0 ? (
          <p>No files uploaded</p>
        ) : (
          materials.map((m, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b py-3"
            >            

              <div>
                <p className="font-bold">{m.name}</p>
                <p className="text-sm text-gray-500">{m.time}</p>       
              </div>

              <div className="flex gap-3">           

                <a
                  href={m.url}
                  target="_blank"
                  className="bg-green-500 text-white px-3 py-1 rounded"    
                >
                  Open
                </a>

                <button
                  onClick={() => deleteFile(i)}
                  className="bg-red-500 text-white px-3 py-1 rounded"          
                >
                  Delete
                </button>        

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default HelpingMaterial;        