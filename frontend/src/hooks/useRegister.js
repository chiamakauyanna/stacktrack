import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const useRegister = () => {
  const [state, setState] = useState({ loading: false, error: null, success: null });
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ loading: true, error: null, success: null });
    try {
      const res = await registerUser(formData);
      setState({ loading: false, success: res.message || "Registration successful!" });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setState({ loading: false, error: error.message || "Registration failed" });
    }
  };

  return { formData, handleChange, handleSubmit, ...state };
};

export default useRegister;
