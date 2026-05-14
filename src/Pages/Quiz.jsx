// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import questions from "../data/questions";

// const Quiz = () => {
//   const navigate = useNavigate();

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);

//   const handleAnswer = (selectedOption) => {
//     if (selectedOption === questions[currentQuestion].answer) {
//       setScore(score + 1);
//     }

//     const nextQuestion = currentQuestion + 1;

//     if (nextQuestion < questions.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       localStorage.setItem("score", score + (selectedOption === questions[currentQuestion].answer ? 1 : 0));
//       localStorage.setItem("total", questions.length);
//       navigate("/result");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Question {currentQuestion + 1} / {questions.length}
//         </h2>

//         <h1 className="text-3xl font-semibold mb-8 text-center">
//           {questions[currentQuestion].question}
//         </h1>
//         <div className="space-y-4">
//           {questions[currentQuestion].options.map((option, index) => (
//             <button
//               key={index}
//               onClick={() => handleAnswer(option)}
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl text-lg duration-300"
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;   
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";

const TOTAL_TIME = 600; // 10 minutes

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

          // AUTO SUBMIT
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

  // ================= SUBMIT QUIZ =================
  const handleSubmit = (isAuto = false) => {
    if (submitted) return;

    setSubmitted(true);

    clearInterval(timerRef.current);

    let score = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });

    const student = JSON.parse(localStorage.getItem("student")) || {};

    const resultData = {
      ...student,
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
    };

    const oldResults =
      JSON.parse(localStorage.getItem("results")) || [];

    localStorage.setItem(
      "results",
      JSON.stringify([...oldResults, resultData])
    );

    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);

    // RESULT PAGE
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

        {/* TIMER */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 bg-white inline-block px-6 py-2 rounded-xl shadow">
            Time Left: {formatTime(timeLeft)}
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
                    onChange={() => handleSelect(qIndex, option)}
                    className="w-6 h-6 accent-[#0E5D84]"
                  />

                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center pb-10">
          <button
            onClick={() => handleSubmit(false)}
            disabled={submitted}
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-xl text-2xl font-bold duration-300 shadow-lg disabled:opacity-50"
          >
            {submitted ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Quiz;