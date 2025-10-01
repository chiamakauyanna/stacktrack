const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
