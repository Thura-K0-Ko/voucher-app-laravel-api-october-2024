import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import CreateProductCart from "../components/CreateProductCart";

const CreateProductPage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb
          currentPageTitle={"Create Product"}
          links={[{ path: "/product", name: "Product Module" }]}
        />
        <CreateProductCart />
      </Container>
    </section>
  );
};
export default CreateProductPage;
