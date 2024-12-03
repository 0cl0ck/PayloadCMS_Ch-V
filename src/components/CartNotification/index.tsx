import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartNotificationProps {
  message: string;
}

const CartNotification: React.FC<CartNotificationProps> = ({ message }) => {
  const notify = () => toast(message);

  return (
    <div>
      <button onClick={notify}>Notify</button>
      <ToastContainer />
    </div>
  );
};

export default CartNotification;
