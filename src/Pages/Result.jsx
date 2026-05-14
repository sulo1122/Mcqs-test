// import { useNavigate } from "react-router-dom";

// const Result = () => {
//   const navigate = useNavigate();

//   const student = JSON.parse(localStorage.getItem("student") || "{}");
//   const score = Number(localStorage.getItem("score") || 0);
//   const total = Number(localStorage.getItem("total") || 0);

//   const percentage = total ? ((score / total) * 100).toFixed(0) : 0;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl text-center">    

//         <h1 className="text-3xl font-bold mb-6 text-green-600">     
//           Test Result
//         </h1>

//         <div className="space-y-3 text-lg">
//           <p><b>Name:</b> {student.name || "N/A"}</p>
//           <p><b>ID Card:</b> {student.idcard || "N/A"}</p>
//           <p><b>Semester:</b> {student.semester || "N/A"}</p>
//           <p><b>Department:</b> {student.department || "N/A"}</p>  

//           <hr className="my-4" />

//           <p><b>Score:</b> {score}/{total}</p>
//           <p><b>Percentage:</b> {percentage}%</p>      
//         </div>

//         <button
//           onClick={() => navigate("/")}
//           className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg"
//         >
//           Back Home
//         </button>

//       </div>
//     </div>
//   );
// };

// export default Result;  
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("resultDetail"));
  const review = data?.review || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Test Result
        </h1>

        <p className="mt-2">Name: {data?.name}</p>
        <p>ID Card: {data?.idcard}</p>
        <p>Department: {data?.department}</p>
        <p>Semester: {data?.semester}</p>

        <p className="mt-2">Score: {data?.score}/{data?.total}</p>
        <p>Percentage: {data?.percentage}%</p>
      </div>

      {/* REVIEW SECTION */}
      <div className="max-w-4xl mx-auto mt-8 space-y-4">

        <h2 className="text-2xl font-bold text-center">
          Answer Review
        </h2>

        {review.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl shadow ${
              item.isCorrect ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <h3 className="font-bold">
              Q{index + 1}: {item.question}
            </h3>

            <p>🟡 Your Answer: {item.selected}</p>
            <p>🟢 Correct Answer: {item.correct}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Back Home
        </button>
      </div>

    </div>
  );
};

export default Result;