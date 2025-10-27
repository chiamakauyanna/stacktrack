
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const useProfile = () => {
    const { user, patchUserProfile } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
      bio: "",
      role: "",
      avatar: "",
    });
    console.log(user)
  
    const fileInputRef = useRef(null);
  
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
  
    if (!user) return null;
  
    const initials = user.username?.charAt(0)?.toUpperCase() || "?";
  
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
         
          setForm((prev) => ({ ...prev, ...updated }));
        } catch (err) {
          console.error("Avatar upload failed", err);
        }
      };
      reader.readAsDataURL(file);
    };

    const handleSave = async () => {
    try {
      const updated = await patchUserProfile({
        bio: form.bio,
        role: form.role,
      });

      setForm((prev) => ({ ...prev, ...updated }));

      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };


  return {
isEditing, setIsEditing, form, fileInputRef, handleChange, handleAvatarChange, handleAvatarClick, initials, patchUserProfile, handleSave
  }
}

export default useProfile