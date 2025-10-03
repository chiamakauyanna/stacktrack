import AuthLayout from "../layouts/AuthLayout";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col md:flex-row items-center h-[calc(100vh-1rem)]">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 px-8 bg-landing-bg rounded-r-4xl shadow-lg absolute top-2 bottom-2 pt-8 z-10">
          <p className="mb-24 text-sm text-landing-navy font-semibold text-right">
            Remembered your password?{" "}
            <a
              href="/login"
              className="border-2 border-landing-navy py-1.5 px-2 rounded-lg"
            >
              Back to Login
            </a>
          </p>

          <p className="text-3xl font-bold text-landing-text-muted mb-16">
            Set New Password
          </p>

          <form>
            <div className="bg-white p-3 rounded-xl shadow-md">
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 border-b border-gray-300 focus:ring-2 focus:ring-landing-secondary focus:rounded-xl outline-none"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-3 focus:ring-2 focus:ring-landing-secondary focus:rounded-xl outline-none"
              />
            </div>

            <button className="bg-landing-navy hover:bg-landing-primary text-landing-bg py-3 px-8 rounded-lg font-medium transition mt-6">
              Reset Password
            </button>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex w-full relative bg-landing-secondary items-center justify-center p-8 h-full">
          {/* <img
            src="/illustrations/reset-password.svg" // <-- replace with your illustration
            alt="Reset Password Illustration"
            className="max-w-sm"
          /> */}
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
