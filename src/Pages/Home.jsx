import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaClock,
  FaCheckCircle,
  FaLaptopCode,
  FaMedal,
  FaUsers,
  FaBrain,
  FaAward,
  FaUniversity,
} from "react-icons/fa";

import bg from "../assets/bg.jpg";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState("");

  const [studentsOnline, setStudentsOnline] = useState(1245);
  const [testsCompleted, setTestsCompleted] = useState(8921);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      setStudentsOnline((prev) => prev + Math.floor(Math.random() * 2));

      setTestsCompleted((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      <div
        className="min-h-screen bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Animated Background */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
          }}
          className="absolute top-10 left-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"
        ></motion.div>

        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
          }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        ></motion.div>

        {/* Main */}
        <div className="relative z-10 container mx-auto px-4 py-10">
          {/* Top Bar */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-center 
            bg-white/10 border border-white/10 backdrop-blur-xl 
            rounded-3xl p-5 mb-8"
          >
            <div>
              <h1 className="text-5xl font-extrabold text-white">
                MMDC Academy
              </h1>

              <p className="text-gray-300 mt-2">
                Advanced AI Online Examination System
              </p>
            </div>

            <div className="flex gap-4 mt-5 lg:mt-0 flex-wrap">
              <div className="bg-orange-500/20 px-5 py-3 rounded-2xl text-white">
                ⏰ {currentTime}
              </div>

              <div className="bg-green-500/20 px-5 py-3 rounded-2xl text-white">
                👨‍🎓 {studentsOnline}+ Students Online
              </div>

              <div className="bg-blue-500/20 px-5 py-3 rounded-2xl text-white">
                📄 {testsCompleted}+ Tests Completed
              </div>
            </div>
          </motion.div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="inline-block bg-orange-500/20 px-5 py-2 rounded-full text-orange-300 mb-5">
                🚀 NEXT GENERATION TESTING PLATFORM
              </div>

              <h1 className="text-6xl font-extrabold text-white leading-tight">
                Smart MCQs
                <span className="text-orange-400"> Examination </span>
                System
              </h1>

              <p className="text-gray-300 mt-6 text-lg leading-8">
                Experience modern online examination with timer system,
                analytics, live ranking, instant results, answer review,
                performance tracking, and AI-powered examination features.
              </p>

              {/* Buttons */}
              <div className="flex gap-4 mt-8 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-orange-500 px-8 py-4 rounded-2xl text-white font-bold"
                >
                  🎯 Live Test System
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-white font-bold"
                >
                  📊 Performance Dashboard
                </motion.button>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 border border-white/10 rounded-3xl p-5"
                >
                  <FaBrain className="text-4xl text-orange-400 mb-4" />

                  <h3 className="text-white text-xl font-bold">
                    AI Monitoring
                  </h3>

                  <p className="text-gray-300 text-sm mt-2">
                    Smart anti-cheating detection system.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 border border-white/10 rounded-3xl p-5"
                >
                  <FaMedal className="text-4xl text-yellow-400 mb-4" />

                  <h3 className="text-white text-xl font-bold">
                    Top Ranking
                  </h3>

                  <p className="text-gray-300 text-sm mt-2">
                    Live leaderboard & top scorers.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 border border-white/10 rounded-3xl p-5"
                >
                  <FaLaptopCode className="text-4xl text-blue-400 mb-4" />

                  <h3 className="text-white text-xl font-bold">
                    Digital Exams
                  </h3>

                  <p className="text-gray-300 text-sm mt-2">
                    Fully computerized exam environment.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 border border-white/10 rounded-3xl p-5"
                >
                  <FaAward className="text-4xl text-green-400 mb-4" />

                  <h3 className="text-white text-xl font-bold">
                    Certificates
                  </h3>

                  <p className="text-gray-300 text-sm mt-2">
                    Download result & certificates instantly.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side */}
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex justify-center items-center"
            >
              <div
                className="bg-white/10 border border-white/10 backdrop-blur-2xl
                rounded-[40px] p-10 shadow-2xl text-center max-w-xl w-full"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-500/20 mb-6">
                  <FaUniversity className="text-5xl text-orange-400" />
                </div>

                <h2 className="text-5xl font-extrabold text-white leading-tight">
                  Student Portal
                </h2>

                <p className="text-gray-300 mt-6 text-lg leading-8">
                  Access your personalized examination dashboard, attempt live
                  quizzes, check results, performance analytics, rankings,
                  certificates and much more.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
                    <FaCheckCircle className="text-4xl text-green-400 mx-auto mb-3" />

                    <h3 className="text-white font-bold text-lg">
                      Secure Login
                    </h3>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5">
                    <FaClock className="text-4xl text-orange-400 mx-auto mb-3" />

                    <h3 className="text-white font-bold text-lg">
                      Live Exams
                    </h3>
                  </div>
                </div>

                <div className="mt-10">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 0px 40px rgb(249 115 22)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/student-portal")}
                    className="bg-gradient-to-r from-orange-500 to-orange-700 
                    px-10 py-5 rounded-3xl text-white text-xl font-bold w-full"
                  >
                    🎓 Open Student Portal
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid md:grid-cols-3 gap-5 mt-12"
          >
            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <FaUsers className="text-5xl text-orange-400 mb-4" />

              <h3 className="text-white text-2xl font-bold">
                15,000+ Students
              </h3>

              <p className="text-gray-300 mt-2">
                Trusted by students across Pakistan.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <FaMedal className="text-5xl text-yellow-400 mb-4" />

              <h3 className="text-white text-2xl font-bold">
                Best Academy
              </h3>

              <p className="text-gray-300 mt-2">
                Modern digital examination environment.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <FaBrain className="text-5xl text-blue-400 mb-4" />

              <h3 className="text-white text-2xl font-bold">
                Smart Analytics
              </h3>

              <p className="text-gray-300 mt-2">
                AI based result & performance analysis.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;