import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import EditProductCart from "../components/EditProductCart";

const EditProductPage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb
          currentPageTitle={"Edit Product"}
          links={[{ path: "/product", name: "Product Module" }]}
        />
        <EditProductCart />
      </Container>
    </section>
  );
};

export default EditProductPage;
