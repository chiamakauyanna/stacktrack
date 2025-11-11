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
            <a
              href="/signup"
              className="border-2 border-secondary ml-3  py-1.5 px-2 rounded-lg"
            >
              Sign Up
            </a>
          </p>

          <p className="text-3xl font-bold text-secondary text-center mb-8 font-heading">
            Login
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-surface/40 p-3 rounded-xl shadow-md">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border-b border-gray-300 focus:ring-2 focus:ring-secondary focus:rounded-xl outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 focus:ring-2 focus:ring-secondary focus:rounded-xl outline-none"
              />
            </div>

            {/* <div className="text-sm text-red-500 text-right">
              <Link to="/forgot-password" className="hover:underline">
                Forgot your password?
              </Link>
            </div> */}
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
      <div
        className="hidden md:flex items-center justify-center bg-secondary rounded-l-full w-full md:w-1/2"
      >
        <img src={loginImg} alt="Login Illustration" className="max-h-2/3" />
      </div>
    </div>
  );
};

export default Login;
