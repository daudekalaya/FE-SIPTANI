

import React from "react";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="flex mt-6 min-h-screen">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4 bg-gray-100">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
