import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const userAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authenticated = async (path, body, message, logout) => {
    setLoading(true);
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        ...(logout ? {} : { body: JSON.stringify(body) }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.message) {
        if (!logout) {
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("chat-user", JSON.stringify(data.user));
          navigate("/");
        } else {
          localStorage.clear();
          navigate("/login");
        }

        toast.success(message);
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
