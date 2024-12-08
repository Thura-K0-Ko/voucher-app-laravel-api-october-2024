import React, { useEffect, useState } from "react";

const ProductTable = () => {
  //setup function
  //cleanup function
  //dependencies array
  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(3);
  console.log("Product Table rendered");
  // console.log("data", data);
  const fetchData = () =>
    fetch(import.meta.env.VITE_API_URL + `/products`+`?limit=${limit}`).then((res) => {
      res.json().then((json) => {
        setData(json);
      });
    });
  const handleResize = () => {
    console.log("window resized", window.innerWidth);
  };

  useEffect(() => {
    fetchData();
    console.log("Product Table mounted");
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("Product Table unmounted");
    };
  }, [limit]);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Product Table</h1>
      <ul>
     
        {data?.data?.map((product) => (
          <li key={product.id}>
            {product.product_name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductTable;
