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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";

const Quiz = () => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});

  // option select
  const handleSelect = (questionIndex, option) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  // submit quiz
  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please attempt all questions");
      return;
    }

    let score = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
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
    };

    // all students result save
    const oldResults =
      JSON.parse(localStorage.getItem("results")) || [];

    localStorage.setItem(
      "results",
      JSON.stringify([...oldResults, resultData])
    );

    // current student result
    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);

    navigate("/result");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200')",
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ALL QUESTIONS */}
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
          >

            {/* Question Header */}
            <div className="bg-[#0E5D84] text-white p-5 text-2xl font-semibold">
              {qIndex + 1}. {q.question}
            </div>

            {/* Options */}
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

        {/* Submit Button */}
        <div className="flex justify-center pb-10">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-xl text-2xl font-bold duration-300 shadow-lg"
          >
            Submit Quiz
          </button>
        </div>

      </div>
    </div>
  );
};

export default Quiz;