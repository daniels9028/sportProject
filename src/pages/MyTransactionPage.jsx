import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import DashboardNavbar from "../components/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { myTransactionThunk } from "../features/transaction/transactionThunks";

const MyTransactionPage = () => {
  const dispatch = useDispatch();

  const { myTransaction, myTransactionCurrentPage, myTransactionTotalPages } =
    useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(myTransactionThunk({ page: myTransactionCurrentPage }));
  }, []);

  console.log(myTransaction);
  return (
    <div className="bg-white min-h-screen font-mono relative">
      <ToastContainer />
      <DashboardNavbar />

      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">All Transactions</h2>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTransaction?.map((item, index) => (
            <TransactionList item={item} key={item.id} index={index} />
          ))}
        </div> */}

        {/* <TransactionPagination /> */}

        {/* <DetailTransaction /> */}
      </div>
    </div>
  );
};

export default MyTransactionPage;
