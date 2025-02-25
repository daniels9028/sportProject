import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Menu, Users, Settings, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

const AdminPage = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "user") navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <AdminNavbar />

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
          <Link to="/admin/sport-category">
            <Card className="rounded-2xl shadow-md bg-white">
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <Users className="w-12 h-12 text-gray-700" />
                <h2 className="text-xl font-semibold">Sport Category</h2>
                <p className="text-gray-500 text-center">
                  Add, edit, and remove sport category.
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
          <Link to="/admin/sport-activity">
            <Card className="rounded-2xl shadow-md bg-white">
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <BarChart2 className="w-12 h-12 text-gray-700" />
                <h2 className="text-xl font-semibold">Sport Activity</h2>
                <p className="text-gray-500 text-center">
                  Add, edit, and remove sport activity.
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
          <Card className="rounded-2xl shadow-md bg-white">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <Settings className="w-12 h-12 text-gray-700" />
              <h2 className="text-xl font-semibold">Transaction</h2>
              <p className="text-gray-500 text-center">
                Add, track, and cancel transaction
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminPage;
