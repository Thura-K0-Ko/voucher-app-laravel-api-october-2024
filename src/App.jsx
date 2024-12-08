import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import DigitalClock from "./components/DigitalClock";

const App = () => {
  const [show, setShow] = useState(false);

  console.log(show);
  return (
    <div className="p-10">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShow(!show)}
      >
        Hide Show
      </button>
      {show && <ProductTable />}
      {/* {show && <DigitalClock />} */}
    </div>
  );
};

export default App;
