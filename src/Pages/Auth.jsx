import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // REGISTER
  const handleRegister = () => {
    localStorage.setItem("adminUser", JSON.stringify(form));
    alert("✅ Registered Successfully");
    setIsLogin(true);
  };

  // LOGIN
  const handleLogin = () => {
    const savedUser =
      JSON.parse(localStorage.getItem("adminUser"));

    if (
      savedUser &&
      savedUser.email === form.email &&
      savedUser.password === form.password
    ) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("❌ Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-200 to-purple-200">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">

        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Admin Login" : "Admin Register"}
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        {isLogin ? (
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-bold"
          >
            Register
          </button>
        )}

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-center mt-4 text-blue-600 cursor-pointer"
        >
          {isLogin
            ? "Create new account"
            : "Already have account? Login"}
        </p>

      </div>
    </div>
  );
};

export default Auth;