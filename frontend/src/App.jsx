import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);
  

  useEffect(() => {
    initAuth();
  }, [initAuth])
  
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
