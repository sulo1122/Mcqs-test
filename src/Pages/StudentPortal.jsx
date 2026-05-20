import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaIdCard,
  FaBook,   
  FaHospital,    
  FaLock,
  FaEnvelope,
} from "react-icons/fa";

import Header from "../components/Header";
import Footer from "../components/Footer";  

const StudentPortal = () => {
  const navigate = useNavigate();       

  const [isLogin, setIsLogin] = useState(true);      

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    idcard: "",
    semester: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.idcard ||
      !form.semester ||
      !form.department
    ) {
      alert("Fill all fields");    
      return;
    }

    localStorage.setItem("studentUser", JSON.stringify(form));

    alert("Registration Successful");
    setIsLogin(true);
  };

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("studentUser"));

    if (
      user?.email === form.email &&
      user?.password === form.password
    ) {
      localStorage.setItem("studentLoggedIn", "true");   

      localStorage.setItem(
        "student",
        JSON.stringify({
          name: user.name,
          idcard: user.idcard,
          semester: user.semester,
          department: user.department,
        })
      );

      navigate("/quiz");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white">
              🎓 Student Portal
            </h1>

            <p className="text-gray-300 mt-3">
              Login or Register to Start Examination
            </p>
          </div>

          {/* Toggle */}
          <div className="flex bg-black/30 rounded-2xl p-2 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-2xl font-bold transition-all
              ${isLogin ? "bg-orange-500 text-white" : "text-gray-300"}`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-2xl font-bold transition-all
              ${!isLogin ? "bg-orange-500 text-white" : "text-gray-300"}`}
            >
              Register
            </button>
          </div>

          <div className="space-y-5">
            {!isLogin && (
              <>
                <div className="relative">
                  <FaUserGraduate className="absolute top-5 left-4 text-orange-400" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full p-4 pl-12 rounded-2xl bg-black/20 border border-white/10 text-white outline-none"
                  />
                </div>

                <div className="relative">
                  <FaIdCard className="absolute top-5 left-4 text-orange-400" />

                  <input
                    type="text"
                    name="idcard"
                    placeholder="ID Card"
                    onChange={handleChange}
                    className="w-full p-4 pl-12 rounded-2xl bg-black/20 border border-white/10 text-white outline-none"
                  />
                </div>

                <div className="relative">
                  <FaBook className="absolute top-5 left-4 text-orange-400" />

                  <input
                    type="text"
                    name="semester"
                    placeholder="Semester"
                    onChange={handleChange}
                    className="w-full p-4 pl-12 rounded-2xl bg-black/20 border border-white/10 text-white outline-none"
                  />
                </div>

                <div className="relative">
                  <FaHospital className="absolute top-5 left-4 text-orange-400" />

                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    onChange={handleChange}
                    className="w-full p-4 pl-12 rounded-2xl bg-black/20 border border-white/10 text-white outline-none"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <FaEnvelope className="absolute top-5 left-4 text-orange-400" />

              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full p-4 pl-12 rounded-2xl bg-black/20 border border-white/10 text-white outline-none"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-5 left-4 text-orange-400" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-4 pl-12 rounded-2xl bg-black/20 border border-white/10 text-white outline-none"
              />
            </div>

            {isLogin ? (
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-700 py-4 rounded-2xl text-white font-bold text-lg"
              >
                LOGIN
              </button>
            ) : (
              <button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-700 py-4 rounded-2xl text-white font-bold text-lg"
              >
                REGISTER
              </button> 
            )}
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default StudentPortal;