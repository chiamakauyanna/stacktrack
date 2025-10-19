import { useState } from "react";
import { registerUser } from "../services/authService";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      const response = await registerUser(formData);

      if (response.success) {
        setSuccess(response.message || "Registration successful!");
      } else {
        setError(response.message || "Something went wrong.");
      }
      
    } catch (error) {
      setError("Login failed");
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, error, success };
};

export default useRegister;
