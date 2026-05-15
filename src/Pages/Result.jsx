import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion } from "framer-motion";

const Result = () => {
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("resultDetail"));
  const review = data?.review || [];

  const correct = data?.score || 0;
  const total = data?.total || 1;

  const attempted = review.filter(
    (item) => item.selected !== null && item.selected !== "" && item.selected !== undefined
  ).length;

  const wrong = review.filter(
    (item) => item.selected && item.selected !== item.correct
  ).length;

  const unattempted = total - attempted;

  const percentage = total ? Math.round((correct / total) * 100) : 0;

  const [modal, setModal] = useState(null);

  const getPerformance = () => {
    if (percentage >= 90) return { text: "Outstanding 🔥", color: "text-green-600" };
    if (percentage >= 70) return { text: "Very Good 🚀", color: "text-blue-600" };
    if (percentage >= 50) return { text: "Good 👍", color: "text-yellow-600" };
    return { text: "Need Improvement 📚", color: "text-red-600" };
  };

  const p = getPerformance();

  const getStatusColor = (item) => {
    if (!item.selected) return "bg-white border-gray-300 text-gray-600"; // not attempted
    if (item.selected === item.correct) return "bg-green-100 border-green-500 text-green-700";
    return "bg-red-100 border-red-500 text-red-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6">

        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          🎉 Final Result Dashboard
        </h1>

        {/* ================= STUDENT CARD (ADVANCED) ================= */}
        <div className="grid md:grid-cols-4 gap-4">

          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg">
            <p className="text-sm">Name</p>
            <h2 className="font-bold text-lg">{data?.name}</h2>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg">
            <p className="text-sm">ID Card</p>
            <h2 className="font-bold text-lg">{data?.idcard}</h2>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg">
            <p className="text-sm">Department</p>
            <h2 className="font-bold text-lg">{data?.department}</h2>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-pink-700 text-white shadow-lg">
            <p className="text-sm">Semester</p>
            <h2 className="font-bold text-lg">{data?.semester}</h2>
          </div>

        </div>

        {/* ================= STATS ================= */}
        <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">

          {/* SCORE */}
          <div className="bg-blue-50 p-5 rounded-2xl shadow">
            <h2 className="text-xl font-bold">{correct}/{total}</h2>
            <p>Score</p>
          </div>

          {/* WRONG */}
          <div className="bg-red-50 p-5 rounded-2xl shadow">
            <h2 className="text-xl font-bold">{wrong}</h2>
            <p>Wrong</p>
          </div>

          {/* PERCENT */}
          <div className="bg-green-50 p-5 rounded-2xl shadow">
            <h2 className="text-xl font-bold">{percentage}%</h2>
            <p>Percentage</p>
          </div>

        </div>

        <h2 className={`mt-6 text-center text-2xl font-bold ${p.color}`}>
          {p.text}
        </h2>
      </div>

      {/* ================= ANSWER REVIEW ================= */}
      <div className="max-w-5xl mx-auto mt-10">

        <h2 className="text-2xl font-bold text-center mb-6">
          📖 Answer Review Sheet
        </h2>

        {review.map((item, i) => {
          const isCorrect = item.selected === item.correct;

          return (
            <div
              key={i}
              className={`p-5 rounded-2xl shadow mb-4 border-l-8 transition-all ${getStatusColor(item)}`}
            >
              <h3 className="font-bold mb-2">
                Q{i + 1}: {item.question}
              </h3>

              <p>🟡 Your Answer: {item.selected || "Not Attempted"}</p>
              <p>🟢 Correct Answer: {item.correct}</p>

              <button
                onClick={() =>
                  setModal(
                    isCorrect
                      ? "✔ Correct Answer"
                      : `❌ Correct: ${item.correct}`
                  )
                }
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Explain Answer
              </button>
            </div>
          );
        })}
      </div>

      {/* ================= BUTTONS ================= */}
      <div className="text-center mt-10 flex flex-wrap gap-3 justify-center">

        <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-6 py-3 rounded-xl">
          Back
        </button>

        <button className="bg-green-600 text-white px-6 py-3 rounded-xl">
          Download PDF
        </button>

        <button className="bg-green-700 text-white px-6 py-3 rounded-xl">
          WhatsApp Share
        </button>

      </div>

      {/* ================= MODAL ================= */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center w-80">
            <h2 className="text-lg font-bold mb-3">Answer Explanation</h2>
            <p>{modal}</p>

            <button
              onClick={() => setModal(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Result;