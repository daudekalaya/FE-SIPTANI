import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Implement your logout logic here
    navigate("/");
  };

  return (
    <React.Fragment>
    <div>
      <h1>Admin Dashboard</h1>
      <Outlet />
    </div>
    <aside className="menu pl-2 shadow">
      <p className="menu-label text-gray-600">General</p>
      <ul className="menu-list">
        <li>
          <NavLink
            to={"/dashboard"}
            className="flex items-center text-gray-700 hover:text-blue-500"
          >
            <IoHome className="mr-2" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/products"}
            className="flex items-center text-gray-700 hover:text-blue-500"
          >
            <IoPricetag className="mr-2" /> Products
          </NavLink>
        </li>
      </ul>
      {/* Example of checking role without Redux */}
      {true /* Replace with your role checking logic */ && (
        <div>
          <p className="menu-label text-gray-600">Admin</p>
          <ul className="menu-list">
            <li>
              <NavLink
                to={"/users"}
                className="flex items-center text-gray-700 hover:text-blue-500"
              >
                <IoPerson className="mr-2" /> Users
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      <p className="menu-label text-gray-600">Settings</p>
      <ul className="menu-list">
        <li>
          <button
            onClick={logout}
            className="flex items-center text-gray-700 hover:text-red-500"
          >
            <IoLogOut className="mr-2" /> Logout
          </button>
        </li>
      </ul>
    </aside>
    </React.Fragment>
  );
};

export default Sidebar;
