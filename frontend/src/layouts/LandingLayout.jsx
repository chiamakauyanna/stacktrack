import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const LandingLayout = ({ children }) => {
  return (
    <div className="font-body bg-bg text-text">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
