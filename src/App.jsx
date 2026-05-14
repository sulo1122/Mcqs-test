// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
// import Quiz from "./Pages/Quiz";
// import Result from "./Pages/Result";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Quiz" element={<Quiz />} />
//         <Route path="/Result" element={<Result />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import Admin from "./Pages/Admin";
import HelpingMaterial from "./Pages/HelpingMaterial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/materials" element={<HelpingMaterial/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;