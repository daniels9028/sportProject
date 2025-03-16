import React from "react";
import { Button } from "../Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";

const TransactionPagination = ({
  currentPage,
  totalPages,
  transactionThunk,
  loading,
}) => {
  const dispatch = useDispatch();

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(transactionThunk({ page: currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(transactionThunk({ page: currentPage + 1 }));
    }
  };

  return (
    <div className="flex justify-center mt-6 gap-4 items-center">
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1 || loading}
        className="rounded-2xl px-4 py-2 bg-gray-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <span className="text-lg font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages || loading}
        className="rounded-2xl px-4 py-2 bg-gray-200"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default TransactionPagination;
