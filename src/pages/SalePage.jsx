import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";


import SaleInfo from "../components/SaleInfo";

const SalePage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb currentPageTitle={"Sale Module"} />
        <SaleInfo />
      </Container>
    </section>
  );
};

export default SalePage;
