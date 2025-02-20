import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AdminPage = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "user") navigate("/");
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default AdminPage;
