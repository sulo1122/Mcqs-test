import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student") || "{}");
  const score = Number(localStorage.getItem("score") || 0);
  const total = Number(localStorage.getItem("total") || 0);

  const percentage = total ? ((score / total) * 100).toFixed(0) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl text-center">

        <h1 className="text-3xl font-bold mb-6 text-green-600">
          Test Result
        </h1>

        <div className="space-y-3 text-lg">
          <p><b>Name:</b> {student.name || "N/A"}</p>
          <p><b>ID Card:</b> {student.idcard || "N/A"}</p>
          <p><b>Semester:</b> {student.semester || "N/A"}</p>
          <p><b>Department:</b> {student.department || "N/A"}</p>

          <hr className="my-4" />

          <p><b>Score:</b> {score}/{total}</p>
          <p><b>Percentage:</b> {percentage}%</p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Back Home
        </button>

      </div>
    </div>
  );
};

export default Result;