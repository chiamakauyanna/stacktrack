import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import useToast from "./useToast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Logging in...");
    setLoading(true);

    try {
      const res = await loginUser(formData);
      if (res.access) {
        toast.success("Login successful!", { id: loadingToast });
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(res.message || "Invalid credentials", { id: loadingToast });
      }
    } catch (error) {
      toast.error(error.message || "Login failed", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};

export default useLogin;
