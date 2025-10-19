import AuthLayout from "../layouts/AuthLayout";
import useRegister from "../hooks/useRegister";

const Signup = () => {
  const { formData, handleChange, handleSubmit, loading, error, success } =
    useRegister();
  return (
    <AuthLayout>
      <div className="flex flex-col md:flex-row items-center h-[calc(100vh-1rem)]">
        {/* Left: Illustration (replace with SVG or image) */}
        <div className="hidden md:flex w-full relative bg-landing-secondary items-center justify-center p-8 h-full">
          {/* <img
            src="/illustrations/signup.svg" // <-- replace
            alt="Signup Illustration"
            className="max-w-sm"
          /> */}
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 px-8 bg-landing-bg rounded-l-4xl shadow-lg absolute right-2 top-2 bottom-2 pt-8">
          <p className="mb-24 text-sm text-landing-navy text- font-semibold text-right">
            Already have an account?{" "}
            <a
              href="/login"
              className="border-2 border-landing-navy py-1.5 px-2 rounded-lg"
            >
              Sign in
            </a>
          </p>

          <p className="text-3xl font-bold text-landing-text-muted mb-16">
            Create Account
          </p>
          <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <div className="bg-white p-3 rounded-xl shadow-md">
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="w-full p-3 border-b border-gray-300 focus:ring-2 focus:ring-landing-secondary focus:rounded-xl outline-none"
                onChange={handleChange}
                value={formData.username}
              />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="w-full p-3 border-b border-gray-300 focus:ring-2 focus:ring-landing-secondary focus:rounded-xl outline-none"
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full p-3 focus:ring-2 focus:ring-landing-secondary focus:rounded-xl outline-none"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <button className="bg-landing-navy hover:bg-landing-primary text-white py-3 px-8 rounded-lg font-medium transition mt-10">
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
