import { useEffect, useState } from "react";

const Admin = () => {
  const [results, setResults] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // RESULTS
    const data =
      JSON.parse(localStorage.getItem("results")) || [];

    setResults(data);

    // COMMENTS
    const allComments =
      JSON.parse(localStorage.getItem("comments")) || [];

    setComments(allComments);
  }, []);

  // DELETE RESULT
  const deleteResult = (index) => {
    const updatedResults = results.filter(
      (_, i) => i !== index
    );

    setResults(updatedResults);

    localStorage.setItem(
      "results",
      JSON.stringify(updatedResults)
    );
  };

  // DELETE COMMENT
  const deleteComment = (index) => {
    const updatedComments = comments.filter(
      (_, i) => i !== index
    );

    setComments(updatedComments);

    localStorage.setItem(
      "comments",
      JSON.stringify(updatedComments)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">

        <div className="bg-white shadow-2xl rounded-3xl p-6 flex justify-between items-center flex-wrap gap-4">

          <div>
            <h1 className="text-4xl font-extrabold text-blue-700">
              🎓 Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Students Results & Feedback Management
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">

            <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <h2 className="text-lg font-bold">
                Results: {results.length}
              </h2>
            </div>

            <div className="bg-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <h2 className="text-lg font-bold">
                Comments: {comments.length}
              </h2>
            </div>

          </div>

        </div>

      </div>

      {/* RESULTS TABLE */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5">
          <h2 className="text-2xl font-bold">
            📊 Student Results
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">ID Card</th>
                <th className="p-4 text-left">Semester</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-center">Score</th>
                <th className="p-4 text-center">%</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody>

              {results.length > 0 ? (
                results.map((r, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-blue-50 duration-200"
                  >

                    <td className="p-4">{i + 1}</td>

                    <td className="p-4 font-bold">
                      {r.name}
                    </td>

                    <td className="p-4">
                      {r.idcard}
                    </td>

                    <td className="p-4">
                      {r.semester}
                    </td>

                    <td className="p-4">
                      {r.department}
                    </td>

                    <td className="p-4 text-center font-bold">
                      {r.score}/{r.total}
                    </td>

                    <td className="p-4 text-center text-blue-600 font-bold">
                      {r.percentage}%
                    </td>

                    <td className="p-4 text-center">

                      <span
                        className={`px-4 py-2 rounded-full text-white text-sm font-bold
                        ${
                          r.percentage >= 50
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {r.percentage >= 50
                          ? "PASS"
                          : "FAIL"}
                      </span>

                      <button
                        onClick={() => deleteResult(i)}
                        className="mt-3 block mx-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-10 text-gray-500"
                  >
                    No Results Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* COMMENTS SECTION */}
      <div className="max-w-7xl mx-auto mt-10">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="bg-gradient-to-r from-pink-600 to-red-500 text-white p-5">
            <h2 className="text-2xl font-bold">
              💬 Student Feedback / Comments
            </h2>
          </div>

          <div className="p-6 space-y-5">

            {comments.length > 0 ? (
              comments.map((c, i) => (
                <div
                  key={i}
                  className="bg-gray-100 border-l-8 border-pink-500 p-5 rounded-2xl shadow"
                >

                  <p className="text-lg text-gray-700">
                    {c.text}
                  </p>

                  <p className="text-sm text-gray-500 mt-3">
                    🕒 {c.time}
                  </p>

                  <button
                    onClick={() => deleteComment(i)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
                  >
                    🗑 Delete Comment
                  </button>

                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                No Comments Yet
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Admin;
