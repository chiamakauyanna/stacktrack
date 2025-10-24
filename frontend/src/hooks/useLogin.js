import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const useLogin = () => {
  const [state, setState] = useState({ loading: false, error: null, success: null });
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ loading: true, error: null, success: null });
    try {
      const res = await loginUser(formData);
      if (res.access) {
        setState({ loading: false, success: "Login successful!" });
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setState({ loading: false, error: res.message || "Invalid credentials" });
      }
    } catch {
      setState({ loading: false, error: "Login failed" });
    }
  };

  return { formData, handleChange, handleSubmit, ...state };
};

export default useLogin;
