import AuthLayout from "../layouts/AuthLayout";

const Signup = () => {
  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button className="w-full bg-landing-navy text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
