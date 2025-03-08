import React, { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import ModalUpdateProfile from "../components/ModalUpdateProfile";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.profile);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = () => setIsOpen(false);

  return (
    <div className="bg-white min-h-screen font-mono relative">
      <ToastContainer />
      <DashboardNavbar />

      <div className="px-6">
        <div className="max-w-3xl mx-auto text-white bg-black border-4 border-white shadow-[12px_12px_0_0_black] p-12 my-16 relative">
          <h1 className="lg:text-7xl text-xl font-extrabold mb-10 uppercase border-b-4 border-white pb-3 tracking-widest">
            Profile
          </h1>
          <div className="flex flex-col gap-8">
            <div className="relative group">
              <div className="bg-gray-900 border-4 border-white p-6 shadow-[6px_6px_0_0_white] relative transition-transform duration-200 group-hover:scale-105">
                <p className="lg:text-2xl text-lg">
                  Name :{" "}
                  <span className="font-extrabold text-[#f8e71c] capitalize">
                    {user?.name}
                  </span>
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-gray-900 border-4 border-white p-6 shadow-[6px_6px_0_0_white] relative transition-transform duration-200 group-hover:scale-105">
                <p className="lg:text-2xl text-lg">
                  Email :{" "}
                  <span className="font-extrabold text-[#50e3c2]">
                    {user?.email}
                  </span>
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-gray-900 border-4 border-white p-6 shadow-[6px_6px_0_0_white] relative transition-transform duration-200 group-hover:scale-105">
                <p className="lg:text-2xl text-lg">
                  Phone Number :{" "}
                  <span className="font-extrabold text-[#50e3c2]">
                    {user?.phone_number || "-"}
                  </span>
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-gray-900 border-4 border-white p-6 shadow-[6px_6px_0_0_white] relative transition-transform duration-200 group-hover:scale-105">
                <p className="lg:text-2xl text-lg">
                  Role :{" "}
                  <span className="font-extrabold text-[#50e3c2]">
                    {user?.role || "-"}
                  </span>
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-gray-900 border-4 border-white p-6 shadow-[6px_6px_0_0_white] relative transition-transform duration-200 group-hover:scale-105">
                <p className="lg:text-2xl text-lg">Bio :</p>
                <p className="text-lg text-gray-400">
                  Just flow the process and trust God for it
                </p>
              </div>
            </div>

            <button
              className="bg-white text-black border-4 border-black px-8 py-4 uppercase lg:text-xl text-lg font-bold tracking-wide shadow-[6px_6px_0_0_black] hover:bg-gray-100 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all"
              onClick={handleOpenModal}
            >
              Edit Profile
            </button>
          </div>

          {/* Neon Accent Border */}
          <div className="absolute top-0 left-0 w-full h-full border-4 border-[#f8e71c] opacity-20 pointer-events-none"></div>
        </div>
      </div>

      <ModalUpdateProfile
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Edit Profile"
      />
    </div>
  );
};

export default ProfilePage;
