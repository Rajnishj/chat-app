import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const userAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const authenticated = async (path, body, message, isLogout = false) => {
    setLoading(true);
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        ...(isLogout ? {} : { body: JSON.stringify(body) }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.message) {
        if (!isLogout) {
          login(data.user); // Update the context instead of localStorage directly
          navigate("/");
          toast.success(message);
        } else {
          logout(); // Clear context and localStorage
          navigate("/login");
        }
      } else {
        toast.error(data.err);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, authenticated };
};

export default userAuth;
