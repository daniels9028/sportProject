import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import SportCategoryPage from "./pages/SportCategoryPage";
import SportActivityPage from "./pages/SportActivityPage";
import AdminTransactionPage from "./pages/AdminTransactionPage";
import ProfilePage from "./pages/ProfilePage";
import MyTransactionPage from "./pages/MyTransactionPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/transactions" element={<MyTransactionPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/sport-category" element={<SportCategoryPage />} />
          <Route path="/admin/sport-activity" element={<SportActivityPage />} />
          <Route
            path="/admin/all-transaction"
            element={<AdminTransactionPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
