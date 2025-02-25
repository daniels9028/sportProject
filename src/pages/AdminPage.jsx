import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Menu, Users, Settings, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AdminPage = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "user") navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-2xl mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <Button className="rounded-2xl px-6 py-2">Logout</Button>
      </header>

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
          <Card className="rounded-2xl shadow-md bg-white">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <BarChart2 className="w-12 h-12 text-gray-700" />
              <h2 className="text-xl font-semibold">Sport Activity</h2>
              <p className="text-gray-500 text-center">
                Add, edit, and remove sport activity.
              </p>
            </CardContent>
          </Card>
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
