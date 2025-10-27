import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);


function App() {
  const initAuth = useAuthStore((state) => state.initAuth);
  

  useEffect(() => {
    initAuth();
  }, [])
  
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
