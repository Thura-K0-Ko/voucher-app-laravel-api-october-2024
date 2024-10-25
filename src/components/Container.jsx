import React from "react";

const Container = ({ children }) => {
  return (
    <div className=" w-full md:w-[700px] lg:w-[1000px] mx-auto">{children}</div>
  );
};

export default Container;
