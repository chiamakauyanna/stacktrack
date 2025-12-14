import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";
import { useAuthStore } from "../store/useAuthStore";

const useLogin = () => {
  const { login, loading } = useAuthStore();
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

    try {
      const user = await login(formData);
      if (user) {
        toast.success("Login successfull!", { id: loadingToast });
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(user.message || "Invalid credentials", {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error(error.message || "Login failed", { id: loadingToast });
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};

export default useLogin;
