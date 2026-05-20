
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";

const TOTAL_TIME = 2600;

const Quiz = () => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);

  // ================= TIMER =================
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);

          handleSubmit(true);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // ================= FORMAT TIME =================
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // ================= SELECT ANSWER =================
  const handleSelect = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  // ================= CLEAR ANSWERS =================
  const clearAnswers = () => {
    setAnswers({});
  };

  // ================= SUBMIT QUIZ =================
  const handleSubmit = (isAuto = false) => {
    if (submitted) return;

    setSubmitted(true);

    clearInterval(timerRef.current);

    let score = 0;

    const detailedAnswers = questions.map((q, index) => {
      const isCorrect = answers[index] === q.answer;

      if (isCorrect) score++;

      return {
        question: q.question,
        selected: answers[index] || "Not Answered",
        correct: q.answer,
        isCorrect,
      };
    });

    const student =
      JSON.parse(localStorage.getItem("student")) || {};

    const resultData = {
      ...student,
      score,
      total: questions.length,
      percentage: Math.round(
        (score / questions.length) * 100
      ),
      review: detailedAnswers,
    };

    localStorage.setItem(
      "resultDetail",
      JSON.stringify(resultData)
    );

    const oldResults =
      JSON.parse(localStorage.getItem("results")) || [];

    localStorage.setItem(
      "results",
      JSON.stringify([...oldResults, resultData])
    );

    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);

    navigate("/result");
  };

  // ================= UI =================
  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200')",
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8">

        {/* TOP BAR */}
        <div className="flex justify-between items-center flex-wrap gap-4"> 

          
          

          {/* TIMER */}
          <h2 className="text-3xl font-bold text-red-600 bg-white inline-block px-6 py-2 rounded-xl shadow">
            ⏰ Time Left: {formatTime(timeLeft)}
          </h2>

        </div>

        {/* QUESTIONS */}
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="bg-[#0E5D84] text-white p-5 text-2xl font-semibold">
              {qIndex + 1}. {q.question}
            </div>

            <div className="p-8 space-y-5">
              {q.options.map((option, optIndex) => (
                <label
                  key={optIndex}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer border transition text-xl
                  ${
                    answers[qIndex] === option
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={option}
                    checked={answers[qIndex] === option}
                    onChange={() =>
                      handleSelect(qIndex, option)
                    }
                    className="w-6 h-6 accent-[#0E5D84]"
                  />

                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* BUTTONS */}
        {/* BUTTONS */}
<div className="flex justify-center gap-5 pb-10 flex-wrap">

  {/* BACK BUTTON */}
  <button
    onClick={() => navigate(-1)}
    className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-xl text-2xl font-bold duration-300 shadow-lg"
  >
    ⬅ Back
  </button>

  {/* CLEAR BUTTON */}
  <button
    onClick={clearAnswers}
    className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-xl text-2xl font-bold duration-300 shadow-lg"
  >
    🗑 Clear Answers
  </button>

  {/* SUBMIT BUTTON */}
  <button
    onClick={() => handleSubmit(false)}
    disabled={submitted}
    className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-xl text-2xl font-bold duration-300 shadow-lg disabled:opacity-50"
  >
    {submitted
      ? "Submitting..."
      : "✅ Submit Quiz"}
  </button>

</div>

      </div>
    </div>
  );
};

export default Quiz;