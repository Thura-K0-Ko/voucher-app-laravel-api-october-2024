import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import VoucherDetailCart from "../components/VoucherDetailCart";

const VoucherDetail = () => {
  return (
    <section>
      <Container>
        <Breadcrumb
          currentPageTitle={"Voucher Detail"}
          links={[{ path: "/voucher", name: "Voucher Module" }]}
        />
        <VoucherDetailCart />                                                           
      </Container>
    </section>
  );
};

export default VoucherDetail;