import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { sportActivitiesThunk } from "../features/activity/activityThunks";
import { Button } from "../components/Button";

import SportActivityList from "../components/SportActivity/SportActivityList";
import ModalDetailSportActivity from "../components/SportActivity/ModalDetailSportActivity";
import PaginationSportActivity from "../components/SportActivity/PaginationSportActivity";
import ModalCreateSportActivity from "../components/SportActivity/ModalCreateSportActivity";

const SportActivityPage = () => {
  const { activity, currentPage } = useSelector((state) => state.activity);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(sportActivitiesThunk({ page: currentPage }));
  }, [dispatch, currentPage]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <AdminNavbar />

      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Sports Activity Management
        </h2>
        <div className="flex gap-2 mb-4 justify-end">
          <Button
            className="rounded-2xl flex items-center gap-2"
            onClick={handleOpenModal}
          >
            <Plus className="w-4 h-4" /> Add Sport Activity
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activity?.map((item, index) => (
            <SportActivityList item={item} key={item.id} index={index} />
          ))}
        </div>

        <PaginationSportActivity />

        {/* Modal */}
        <ModalDetailSportActivity />

        <ModalCreateSportActivity
          isModalOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Input Sport Activity"
        />
      </div>
    </div>
  );
};

export default SportActivityPage;
