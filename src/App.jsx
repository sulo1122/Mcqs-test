
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import Admin from "./Pages/Admin";
import HelpingMaterial from "./Pages/HelpingMaterial";
import Auth from "./Pages/Auth";
import ProtectedRoute from "./Components/ProtectedRoute";
import StudentPortal from "./Pages/StudentPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/materials" element={<HelpingMaterial/>}/>
         <Route path="/auth" element={<Auth />} />
         <Route path="/student-portal" element={<StudentPortal />} />
         <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;