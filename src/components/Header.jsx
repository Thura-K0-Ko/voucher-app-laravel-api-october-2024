import React from "react";
import Container from "./Container";

const Header = () => {
  return (
    <header>
      <Container>
        <h1 className=" text-3xl font-bold text-stone-800">MMS SOLUTION</h1>
        <p className="  text-stone-500">Invoice App</p>
      </Container>
    </header>
  );
};

export default Header;
