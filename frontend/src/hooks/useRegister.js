import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";
import { useAuthStore } from "../store/useAuthStore";

const useRegister = () => {
  const { register, loading } = useAuthStore();
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

    try {
      const user = await register(formData);
      toast.success(user.message || "Registration successfull!", {
        id: loadingToast,
      });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error(error.message || "Registration failed", {
        id: loadingToast,
      });
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};

export default useRegister;
