import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../features/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";
import { loginBackground } from "../assets";
import { ToastContainer, toast, Bounce } from "react-toastify";
import PasswordInput from "../components/PasswordInput";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
    c_password: "",
    role: "user",
    phone_number: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerThunk(credentials))
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

        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
      className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center p-4"
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
          Register
        </h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border-2 border-black bg-transparent placeholder-black text-black font-mono text-lg focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={credentials.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border-2 border-black bg-transparent placeholder-black text-black font-mono text-lg focus:outline-none"
          required
        />
        <PasswordInput
          credentials={credentials}
          handleChange={handleChange}
          name="password"
          value={credentials.password}
          placeholder="Password"
        />
        <PasswordInput
          credentials={credentials}
          handleChange={handleChange}
          name="c_password"
          value={credentials.c_password}
          placeholder="Confirmation Password"
        />
        <input
          type="number"
          placeholder="Phone Number"
          name="phone_number"
          value={credentials.phone_number}
          onChange={handleChange}
          className="w-full p-3 mb-4 border-2 border-black bg-transparent placeholder-black text-black font-mono text-lg focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-black text-white font-extrabold text-lg uppercase tracking-wide hover:bg-white hover:text-black border-2 hover:border-black transition-all duration-200"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <div className="text-center mt-4 text-lg">
          <p>Already have account?</p>{" "}
          <Link to="/login" className="text-blue-500 cursor-pointer underline">
            Login here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
