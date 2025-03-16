import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { paymentMethodsThunk } from "../features/payment/paymentThunks";
import { useEffect } from "react";
import PaymentList from "./PaymentList";

const ModalMetodePembayaran = ({ isModalOpen, onClose, title }) => {
  const dispatch = useDispatch();

  const { payment: payments } = useSelector((state) => state.payment);

  useEffect(() => {
    if (isModalOpen) {
      dispatch(paymentMethodsThunk());
    }
  }, [isModalOpen]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onClose} title={title}>
        {payments.map((payment) => (
          <PaymentList key={payment.id} item={payment} onClose={onClose} />
        ))}
      </Modal>
    </>
  );
};

export default ModalMetodePembayaran;
