import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Result = () => {
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("resultDetail"));
  const review = data?.review || [];

  const correct = data?.score || 0;
  const total = data?.total || 1;

  const attempted = review.filter(
    (item) =>
      item.selected !== null &&
      item.selected !== "" &&
      item.selected !== undefined
  ).length;

  const wrong = review.filter(
    (item) => item.selected && item.selected !== item.correct
  ).length;

  const percentage = total ? Math.round((correct / total) * 100) : 0;

  const [modal, setModal] = useState(null);

  // ================= PERFORMANCE =================
  const getPerformance = () => {
    if (percentage >= 90) return { text: "Outstanding 🔥", color: "text-green-600" };
    if (percentage >= 70) return { text: "Very Good 🚀", color: "text-blue-600" };
    if (percentage >= 50) return { text: "Good 👍", color: "text-yellow-600" };
    return { text: "Need Improvement 📚", color: "text-red-600" };   
  };

  const p = getPerformance();

  // ================= STATUS COLOR =================
  const getStatusColor = (item) => {
    if (!item.selected) return "bg-white border-gray-300 text-gray-600";
    if (item.selected === item.correct)
      return "bg-green-100 border-green-500 text-green-700";
    return "bg-red-100 border-red-500 text-red-700";
  };

  // ================= PDF DOWNLOAD =================
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Student Result Report", 60, 20);     

    doc.setFontSize(12);
    doc.text(`Name: ${data?.name}`, 14, 40);
    doc.text(`ID: ${data?.idcard}`, 14, 50);
    doc.text(`Department: ${data?.department}`, 14, 60);
    doc.text(`Semester: ${data?.semester}`, 14, 70);   

    doc.text(`Score: ${correct}/${total}`, 14, 85);
    doc.text(`Attempted: ${attempted}`, 14, 95);
    doc.text(`Wrong: ${wrong}`, 14, 105);
    doc.text(`Percentage: ${percentage}%`, 14, 115);

    autoTable(doc, {
      startY: 130,
      head: [["Q#", "Question", "Your Answer", "Correct Answer"]],
      body: review.map((r, i) => [
        i + 1,
        r.question,
        r.selected || "Not Attempted",
        r.correct,
      ]),
    });

    doc.save("result-report.pdf");
  };

  // ================= WHATSAPP SHARE =================
  const shareWhatsApp = () => {
    const msg = `
🎓 Result Report

Name: ${data?.name}
ID: ${data?.idcard}
Department: ${data?.department}
Semester: ${data?.semester}

Score: ${correct}/${total}
Attempted: ${attempted}
Wrong: ${wrong}
Percentage: ${percentage}%

📌 Check your full result report!
`;

    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // ================= EXPLAIN =================
  const explainAnswer = (item, isCorrect) => {
    return isCorrect
      ? `✔ Correct Answer: "${item.selected}"`
      : `❌ Wrong Answer. Correct: "${item.correct}", You Selected: "${item.selected || "Not Attempted"}"`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6">

        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          🎉 Final Result Dashboard
        </h1>

        {/* STUDENT INFO */}
        <div className="grid md:grid-cols-4 gap-4">

          <div className="p-4 rounded-2xl bg-blue-600 text-white">
            <p>Name</p>
            <h2 className="font-bold">{data?.name}</h2>
          </div>

          <div className="p-4 rounded-2xl bg-purple-600 text-white">
            <p>ID Card</p>
            <h2 className="font-bold">{data?.idcard}</h2>
          </div>

          <div className="p-4 rounded-2xl bg-green-600 text-white">
            <p>Department</p>
            <h2 className="font-bold">{data?.department}</h2>
          </div>

          <div className="p-4 rounded-2xl bg-pink-600 text-white">
            <p>Semester</p>
            <h2 className="font-bold">{data?.semester}</h2>
          </div>

        </div>

        {/* STATS */}
        <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">

          <div className="bg-blue-50 p-5 rounded-2xl shadow">
            <h2 className="text-xl font-bold">{correct}/{total}</h2>
            <p>Score</p>
          </div>

          <div className="bg-red-50 p-5 rounded-2xl shadow">
            <h2 className="text-xl font-bold">{wrong}</h2>
            <p>Wrong</p>
          </div>

          <div className="bg-green-50 p-5 rounded-2xl shadow">
            <h2 className="text-xl font-bold">{percentage}%</h2>
            <p>Percentage</p>
          </div>

        </div>

        <h2 className={`mt-6 text-center text-2xl font-bold ${p.color}`}>
          {p.text}
        </h2>
      </div>

      {/* ================= REVIEW ================= */}
      <div className="max-w-5xl mx-auto mt-10">

        <h2 className="text-2xl font-bold text-center mb-6">
          📖 Answer Review
        </h2>

        {review.map((item, i) => {
          const isCorrect = item.selected === item.correct;

          return (
            <div
              key={i}
              className={`p-5 rounded-2xl shadow mb-4 border-l-8 ${getStatusColor(item)}`}
            >
              <h3 className="font-bold mb-2">
                Q{i + 1}: {item.question}
              </h3>

              <p>🟡 Your Answer: {item.selected || "Not Attempted"}</p>
              <p>🟢 Correct Answer: {item.correct}</p>

              <button
                onClick={() => setModal(explainAnswer(item, isCorrect))}
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

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl"
        >
          Back
        </button>

        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Download PDF
        </button>

        <button
          onClick={shareWhatsApp}
          className="bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          WhatsApp Share
        </button>

      </div>

      {/* ================= MODAL ================= */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center w-80">
            <h2 className="font-bold mb-3">Answer Explanation</h2>
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