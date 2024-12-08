import React from "react";
import ModuleBtn from "../components/ModuleBtn";
import {
  HiCircleStack,
  HiComputerDesktop,
  HiMiniDocumentDuplicate,
} from "react-icons/hi2";
import Container from "../components/Container";

const DashboardPage = () => {
  return (
    <section>
      <Container>
        <div className=" grid sm:grid-cols-3 gap-3 mt-5">
          <ModuleBtn
           url={"/product"}
            icon={<HiCircleStack className=" size-14" />}
            name="Product Module"
          />
          <ModuleBtn
           url={"/sale"}

            icon={<HiComputerDesktop className=" size-14" />}
            name="Sale Module"
          />
          <ModuleBtn
           url={"/voucher"}

            icon={<HiMiniDocumentDuplicate className=" size-14" />}
            name="Voucher Module"
          />
        </div>
  
      </Container>
    </section>
  );
};

export default DashboardPage;
