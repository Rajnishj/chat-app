import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const userAuth = (path, body, message, logout) => {
  console.log(path, body, message);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authenticated = async () => {
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
     if(data.message){
		if (logout) {
			localStorage.removeItem("isAuthenticated");
			navigate("/login");
		  } else {
			localStorage.setItem("isAuthenticated", true);
			navigate("/");
		  }
	
		  toast.success(message);
	 }else{
		toast.error(data.err)
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
