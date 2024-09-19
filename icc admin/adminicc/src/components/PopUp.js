import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changePath } from "../Store/Store";

const PopUp = ({ message, onClose, path, reload }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      closePopup();
      if (reload) window.location.reload();
    }, 3000); // Adjust the duration (in milliseconds) as needed

    return () => clearTimeout(timeout);
  }, []);

  const closePopup = () => {
    dispatch(changePath(path));
    setIsOpen(false);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="bg-gray-800 text-white px-6 py-4 rounded-lg shadow-md">
        <p className="text-xl">{message}</p>
        <button
          className="mt-4 bg-white hover:bg-yellow-800 hover:text-green-200 px-4 py-2 rounded text-yellow-700 font-bold"
          onClick={closePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
