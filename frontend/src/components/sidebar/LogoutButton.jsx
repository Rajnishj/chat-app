import { BiLogOut } from "react-icons/bi";
import userAuth from "../../hooks/userAuth";

const LogoutButton = () => {
  const { loading, authenticated } = userAuth();
  const handleLogout = async () => {
    await authenticated(
      "/api/auth/logout",
      null,
      "User logged out successfully!!!",
      true,
      "/login"
    );
  };
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          onClick={handleLogout}
          className="w-6 h-6 text-white cursor-pointer"
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
