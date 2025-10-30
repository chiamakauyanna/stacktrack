import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import useToast from "./useToast";

const useProfile = () => {
  const { user, patchUserProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    bio: "",
    role: "",
    avatar: "",
  });
  const fileInputRef = useRef(null);
  const toast = useToast();

  // Sync form when user changes
  useEffect(() => {
    if (user) {
      setForm({
        bio: user.bio || "",
        role: user.role || "",
        avatar: user.avatar || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.bio, user?.role, user?.avatar]);

  const initials = user?.username?.charAt(0)?.toUpperCase() || "?";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result;
      setForm((prev) => ({ ...prev, avatar: base64Data }));

      try {
        const updated = await patchUserProfile({ avatar: base64Data });
        toast.success("Avatar updated successfully!");
        setForm((prev) => ({ ...prev, ...updated }));
      } catch (err) {
        toast.error("Failed to upload avatar");
        console.error(err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const loadingToast = toast.loading("Updating profile...");
    try {
      const updated = await patchUserProfile({
        bio: form.bio,
        role: form.role,
      });
      setForm((prev) => ({ ...prev, ...updated }));
      setIsEditing(false);
      toast.success("Profile updated successfully!", { id: loadingToast });
    } catch (err) {
      toast.error("Profile update failed", { id: loadingToast });
      console.error(err);
    }
  };

  return {
    isEditing,
    setIsEditing,
    form,
    fileInputRef,
    handleChange,
    handleAvatarChange,
    handleAvatarClick,
    initials,
    patchUserProfile,
    handleSave,
    user,
  };
};

export default useProfile;
