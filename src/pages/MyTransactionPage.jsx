import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import DashboardNavbar from "../components/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { myTransactionThunk } from "../features/transaction/transactionThunks";
import MyTransactionList from "../components/MyTransactionList";
import TransactionPagination from "../components/allTransaction/TransactionPagination";

const MyTransactionPage = () => {
  const dispatch = useDispatch();

  const {
    myTransaction,
    myTransactionCurrentPage,
    myTransactionTotalPages,
    loading,
  } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(myTransactionThunk({ page: myTransactionCurrentPage }));
  }, []);

  return (
    <div className="bg-white min-h-screen font-mono relative">
      <ToastContainer />
      <DashboardNavbar />

      <h2 className="mt-32 text-center text-3xl font-semibold my-4">
        My Transaction
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-6">
        {myTransaction?.map((item, index) => (
          <MyTransactionList item={item} key={item.id} index={index} />
        ))}
      </div>

      <TransactionPagination
        currentPage={myTransactionCurrentPage}
        totalPages={myTransactionTotalPages}
        transactionThunk={myTransactionThunk}
        loading={loading}
      />
    </div>
  );
};

export default MyTransactionPage;
