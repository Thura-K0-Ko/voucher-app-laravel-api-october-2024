import React, { Suspense } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className=" p-10">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />  
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Layout;
