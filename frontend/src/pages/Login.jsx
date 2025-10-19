import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { formData, handleChange, handleSubmit, loading, error, success } = useLogin();

  return (
    <AuthLayout>
      <div className="flex flex-col md:flex-row items-center h-[calc(100vh-1rem)]">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 px-8 bg-landing-bg rounded-r-4xl shadow-lg absolute top-2 bottom-2 pt-8 z-10">
          <p className="mb-24 text-sm text-landing-navy text- font-semibold text-right">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="border-2 border-landing-navy py-1.5 px-2 rounded-lg"
            >
              Sign Up
            </a>
          </p>

          <p className="text-3xl font-bold text-landing-text-muted mb-16">
            Welcome Back
          </p>
          <form onSubmit={handleSubmit}>
             {success && <p>{success}</p>} 
             {error && <p>{error}</p>}
            <div className="bg-white p-3 rounded-xl shadow-md">
           
              <input
                type="username"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border-b border-gray-300 focus:ring-2 focus:ring-landing-secondary focus:rounded-xl outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 focus:ring-2 focus:ring-landing-secondary focus:rounded-xl outline-none"
              />
            </div>
            <div className="mt-6 text-sm text-red-500 text-right">
              <Link
                to="/forgot-password"
                className="hover:underline mb-2 md:mb-0"
              >
                Forgot your password?
              </Link>
            </div>
            <button className="bg-landing-navy hover:bg-landing-primary text-landing-bg py-3 px-8 rounded-lg font-medium transition">
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Right: Illustration (replace with SVG or image) */}
        <div className="hidden md:flex w-full relative bg-landing-secondary items-center justify-center p-8 h-full">
          {/* <img
            src="/illustrations/signup.svg" // <-- replace
            alt="Signup Illustration"
            className="max-w-sm"
          /> */}
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
