import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import {
  changeIsLoggedIn,
  changePath,
  usePostLogoutMutation,
} from "../Store/Store";

function Logout() {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const [postLogout, result] = usePostLogoutMutation();
  const handleLogout = () => {
    dispatch(changeIsLoggedIn(false));
    dispatch(changePath("/login"));
    postLogout();
    setIsOpen(false);
  };
  function handleCancel(event) {
    setIsOpen(false);
    dispatch(changePath("/news"));
  }
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg">
          <div className="bg-gray-800 p-4 rounded shadow-lg">
            <p className="text-white mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end">
              <button
                onClick={handleCancel}
                className="text-white hover:text-yellow-400 font-semibold mr-4"
              >
                <div className="flex items-center">
                  <div className="mr-2"> Cancel</div>
                  <div>
                    <MdOutlineCancel />
                  </div>
                </div>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-800 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout;
