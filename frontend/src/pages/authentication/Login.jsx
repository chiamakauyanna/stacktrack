import { Link } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import useLogin from "../../hooks/useLogin";
import loginImg from "../../assets/access-account.svg";

const Login = () => {
  const { formData, handleChange, handleSubmit, loading } = useLogin();

  return (
    <div className="flex flex-col md:flex-row h-screen md:bg-accent/25">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 px-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-lg">
          <p className="mb-30 text-sm md:text-base text-navy font-semibold text-right mt-10">
            Don't have an account?{" "}
            <Link to="/signup">
              <button className="border-2 border-secondary ml-3 py-1.5 px-2 rounded-lg">
                Sign Up
              </button>
            </Link>
          </p>

          <p className="text-3xl font-bold text-secondary text-center mb-8 font-heading">
            Login
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-surface/40 p-6 rounded-xl shadow-md space-y-4">
              <label
                htmlFor="username"
                className="flex items-center text-sm font-medium text-gray-600"
              >
                <FiUser className="mr-2" /> Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
              />

              <label
                htmlFor="password"
                className="flex items-center text-sm font-medium text-gray-600"
              >
                <FiLock className="mr-2" /> Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-secondary hover:bg-primary text-white py-3 px-10 rounded-full font-medium transition disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Right: Background Image */}
      <div className="hidden md:flex items-center justify-center bg-secondary rounded-l-full w-full md:w-1/2">
        <img src={loginImg} alt="Login Illustration" className="max-h-2/3" />
      </div>
    </div>
  );
};

export default Login;
