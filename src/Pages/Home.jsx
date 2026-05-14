// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import bg from "../assets/bg.jpg";

// const Home = () => {
//   const navigate = useNavigate();

//   const [student, setStudent] = useState({
//     name: "",
//     idcard: "",
//     semester: "",
//     department: "",      
//   });

//   const handleChange = (e) => {
//     setStudent({
//       ...student,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleStart = () => {
//     localStorage.setItem("student", JSON.stringify(student));
//     navigate("/quiz");
//   };     

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex justify-center items-center p-4"
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       <div className="bg-black/50 w-full max-w-3xl rounded-2xl p-8 text-white">
//         <h1 className="text-4xl font-bold text-center mb-4">
//           Online MCQs Test
//         </h1>
//         <p className="text-center text-lg mb-8"> 
//           Fill your details and start test
//         </p>

//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter Name"
//             onChange={handleChange}
//             className="p-3 rounded-lg text-white outline-none"
//           />

//           <input
//             type="text"
//             name="idcard"
//             placeholder="ID Card Number"
//             onChange={handleChange}
//             className="p-3 rounded-lg text-white outline-none" 
//           />  

//           <input
//             type="text"
//             name="semester"
//             placeholder="Semester"
//             onChange={handleChange}
//             className="p-3 rounded-lg text-white outline-none"   
//           />

//           <input
//             type="text"
//             name="department"
//             placeholder="Department"
//             onChange={handleChange}
//             className="p-3 rounded-lg text-white outline-none" 

//           />
//           </div>

//         <div className="flex justify-center mt-8">
//           <button
//             onClick={handleStart}
//             className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-xl text-xl font-bold duration-300"
//           >
//             START TEST
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;   
import { useState } from "react";
import { useNavigate } from "react-router-dom";   
import bg from "../assets/bg.jpg";  

const Home = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    idcard: "",
    semester: "",
    department: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid =
    student.name &&
    student.idcard &&
    student.semester &&
    student.department;

  const handleStart = () => {
    if (!isFormValid) {
      alert("⚠️ Please fill all fields before starting test");
      return;
    }

    localStorage.setItem("student", JSON.stringify(student));

    navigate("/quiz");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-black/60 w-full max-w-3xl rounded-2xl p-8 text-white shadow-2xl">
      <h1 className="text-6xl font-bold text-center mb-3"> MMDC Academy</h1>

        <h1 className="text-4xl font-bold text-center mb-3">
          Online MCQs Test
        </h1>

        <p className="text-center text-gray-200 mb-8">   
          Fill your details carefully before starting test
        </p>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-orange-400"
          />  

          <input
            type="text"
            name="idcard"
            placeholder="ID Card Number"
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-orange-400"
          />    

          <input
            type="text"
            name="semester"
            placeholder="Semester"
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-orange-400"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-orange-400"
          />

        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleStart}
            disabled={!isFormValid}
            className={`px-8 py-3 rounded-xl text-xl font-bold transition duration-300
              ${isFormValid
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-500 cursor-not-allowed"
              }`}
          >
            START TEST
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;