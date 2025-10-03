const AuthLayout = ({ children }) => {
  return ( 
    <div className="bg-landing-navy p-2">
      <div className="">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
