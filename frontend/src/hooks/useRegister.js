import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import useToast from "./useToast";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Creating account...");
    setLoading(true);

    try {
      const res = await registerUser(formData);
      toast.success(res.message || "Registration successful!", {
        id: loadingToast,
      });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error(error.message || "Registration failed", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};

export default useRegister;
