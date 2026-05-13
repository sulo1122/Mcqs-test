import { useEffect, useState } from "react";

const Admin = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("results")) || [];
    setResults(data);
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-100">

      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th>ID Card</th>
            <th>Semester</th>
            <th>Department</th>
            <th>Score</th>
            <th>%</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="text-center border-b">
              <td className="p-2">{r.name}</td>
              <td>{r.idcard}</td>
              <td>{r.semester}</td>
              <td>{r.department}</td>
              <td>{r.score}/{r.total}</td>
              <td>{r.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Admin;