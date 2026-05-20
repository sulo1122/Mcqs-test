import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const comment = e.target.comment.value;

    if (!comment) {
      alert("Please write a comment");
      return;
    }

    const oldComments =
      JSON.parse(localStorage.getItem("comments")) || [];

    const newComment = {
      text: comment,
      time: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "comments",
      JSON.stringify([...oldComments, newComment])
    );

    alert("✅ Comment sent to Admin");
    e.target.reset();
  };

  return (
    <footer className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 text-white mt-10 border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* ABOUT */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-yellow-300">
            🎓 MMDC Academy
          </h2>

          <p className="text-white/80 leading-7">
            Advanced Online MCQs Testing Platform for students and institutes.
            Practice quizzes, improve knowledge and track performance easily.
          </p>

          {/* SOCIAL MEDIA */}
          <div className="flex gap-4 mt-6">

            <a href="#" className="bg-blue-600 p-3 rounded-full hover:scale-110 duration-300">
              <FaFacebookF />
            </a>

            <a href="#" className="bg-pink-600 p-3 rounded-full hover:scale-110 duration-300">
              <FaInstagram />
            </a>

            <a href="#" className="bg-red-600 p-3 rounded-full hover:scale-110 duration-300">
              <FaYoutube />
            </a>

            <a href="#" className="bg-gray-800 p-3 rounded-full hover:scale-110 duration-300">
              <FaGithub />
            </a>

            <a href="#" className="bg-green-600 p-3 rounded-full hover:scale-110 duration-300">
              <FaWhatsapp />
            </a>

          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-2xl font-bold mb-5 text-white">
            Quick Links
          </h2>

          <ul className="space-y-4 text-white/80">

            <li>
              <Link to="/" className="hover:text-yellow-300">
                🏠 Home
              </Link>
            </li>

            <li>
              <Link to="/admin" className="hover:text-yellow-300">
                ⚙ Admin Panel
              </Link>
            </li>

            <li>
              <Link to="/materials" className="hover:text-yellow-300">
                📚 Materials
              </Link>
            </li>

          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-2xl font-bold mb-5 text-white">
            Contact Info
          </h2>

          <div className="space-y-4 text-white/80">
            <p>📧 support@mmdcacademy.com</p>
            <p>📍 Pakistan</p>
            <p>📞 +92 319 7731645</p>
            <p>🕒 24/7 Support</p>
          </div>
        </div>

        {/* COMMENTS */}
        <div>
          <h2 className="text-2xl font-bold mb-5 text-white">
            Send Feedback
          </h2>

          <form onSubmit={handleCommentSubmit} className="space-y-4">

            <textarea
              name="comment"
              rows="5"
              placeholder="Write your feedback..."
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-yellow-300 resize-none"
            />

            <button
              type="submit"
              className="w-full bg-black/30 hover:bg-black/50 py-3 rounded-2xl font-bold"
            >
              🚀 Send Comment
            </button>

          </form>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20 py-5 text-center text-white/80">
        <p>© 2026 MMDC Academy — All Rights Reserved</p>
        <p className="text-sm mt-1">Designed with ❤️ by Developer</p>
      </div>

    </footer>
  );
};

export default Footer;