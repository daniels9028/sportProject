import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../features/auth/authThunks";
import { myProfileThunk } from "../features/profile/profileThunks";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginBackground } from "../assets";
import { ToastContainer, toast, Bounce } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(credentials))
      .unwrap()
      .then((response) => {
        toast(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        dispatch(myProfileThunk());
      })
      .catch((response) =>
        toast(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        })
      );
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white border-2 border-black shadow-none w-full max-w-md backdrop-blur-md bg-opacity-80"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-black uppercase tracking-wider text-center border-b-2 border-black pb-4">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          className="w-full p-3 mb-4 border-2 border-black bg-transparent placeholder-black text-black font-mono text-lg focus:outline-none"
          required
        />
        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full p-3 border-2 border-black bg-transparent placeholder-black text-black font-mono text-lg focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-black font-bold underline"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-black text-white font-extrabold text-lg uppercase tracking-wide hover:bg-white hover:text-black border-2 hover:border-black transition-all duration-200"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <div className="text-center mt-4 text-lg">
          <p>Don't have account?</p>{" "}
          <Link
            to="/register"
            className="text-blue-500 cursor-pointer underline"
          >
            Register here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
