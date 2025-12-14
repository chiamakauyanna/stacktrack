import { Link } from "react-router-dom";
import useRegister from "../../hooks/useRegister";
import signupImg from "../../assets/authentication.svg";

const Signup = () => {
  const { formData, handleChange, handleSubmit, loading } = useRegister();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-accent/25">
      {/* Left: Background Image */}
      <div className="hidden md:flex items-center justify-center bg-secondary rounded-r-full w-full md:w-1/2">
        <img
          src={signupImg}
          alt="Signup Illustration"
          className="max-h-2/3 max-w-full"
        />
      </div>

      {/* Right: Form */}
      <div className="w-full md:w-1/2 px-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-lg">
          <p className="mb-30 text-sm md:text-base text-navy font-semibold text-right mt-10">
            Already have an account?{" "}
            <Link to="/login">
              <button className="border-2 border-secondary py-1.5 px-2 rounded-lg ml-2 hover:bg-secondary hover:text-white transition">
                Sign in
              </button>
            </Link>
          </p>

          <p className="text-3xl font-bold text-secondary text-center mb-8 font-heading">
            Create Account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="bg-surface/40 p-4 rounded-xl shadow-md">
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="w-full p-3 border-b border-gray-300 focus:ring-2 focus:ring-secondary focus:rounded-xl outline-none"
                onChange={handleChange}
                value={formData.username}
              />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="w-full p-3 border-b border-gray-300 focus:ring-2 focus:ring-secondary focus:rounded-xl outline-none"
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full p-3 focus:ring-2 focus:ring-secondary focus:rounded-xl outline-none"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="bg-secondary hover:bg-primary text-white py-3 px-10 rounded-full font-medium transition disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
