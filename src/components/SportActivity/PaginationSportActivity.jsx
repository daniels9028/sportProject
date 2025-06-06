import React from "react";
import { Button } from "../Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sportActivitiesThunk } from "../../features/activity/activityThunks";
import { useDispatch, useSelector } from "react-redux";

const PaginationSportActivity = () => {
  const { currentPage, totalPages } = useSelector((state) => state.activity);

  const dispatch = useDispatch();

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(sportActivitiesThunk({ page: currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(sportActivitiesThunk({ page: currentPage + 1 }));
    }
  };

  return (
    <div className="flex justify-center mt-6 gap-4 items-center">
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="rounded-2xl px-4 py-2 bg-gray-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <span className="text-lg font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="rounded-2xl px-4 py-2 bg-gray-200"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default PaginationSportActivity;
