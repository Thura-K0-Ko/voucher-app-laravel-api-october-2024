import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useRecordStore from "../stores/useRecordStore";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const SaleForm = () => {
  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + "/products",
    fetcher
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addRecord, changeQuantity, records } = useRecordStore();

  const onSubmit = (data) => {
    const currentProduct = JSON.parse(data.product);
    // const currentProductId = currentProduct.id;

    const isExistedRecord = records.find(
      ({ product: { id } }) => id === currentProduct.id
    );

    // console.log(currentProduct);
    // console.log(data);
    if (isExistedRecord) {
      changeQuantity(isExistedRecord.id, data.quantity);
    } else {
      addRecord({
     
        product_id:currentProduct.id,
        product: currentProduct,
        quantity: parseInt(data.quantity),
        cost: parseInt(currentProduct.price * data.quantity),
        created_at: new Date().toISOString(),
      });
    }

    reset();
  };
  if(isLoading)return <p>loading</p>


  return (
    <section className="mt-5 block print:hidden p-5 border border-gray-200 rounded">
      <form onSubmit={handleSubmit(onSubmit)} id="recordForm">
        <div className="grid  grid-cols-1 sm:grid-cols-5 gap-3">
          <div className=" col-span-2">
            <label
              htmlFor="productSelect"
              className={`block mb-2 text-sm font-medium ${
                errors.product?.type === "required"
                  ? "text-red-700"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              Select Your Product
            </label>
            <select
              id="productSelect"
              {...register("product", { required: true })}
              className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full
               p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white ${
                 errors.product?.type === "required"
                   ? "border-red-300 focus:ring-red-500 focus:border-red-500  dark:border-red-600  dark:focus:ring-red-500 dark:focus:border-red-500"
                   : "border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
               }`}
            >
              <option value="">Select a product</option>
              {!isLoading &&
                data?.data?.map((product) => (
                  <option key={product.id} value={JSON.stringify(product)}>
                    {product.product_name}
                  </option>
                ))}
            </select>
            {errors.product?.type === "required" && (
              <p className="text-red-500 text-sm">Select a product</p>
            )}
          </div>
          <div className="col-span-2">
            <label
              htmlFor="quantityInput"
              className={`block mb-2 text-sm font-medium ${
                errors.quantity?.type === "required"
                  ? "text-red-700"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              Quantity
            </label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              id="quantityInput"
              className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full
                p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white ${
                  errors.quantity?.type === "required"
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500  dark:border-red-600  dark:focus:ring-red-500 dark:focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }`}
            />
            {errors.quantity?.type === "required" && (
              <p className="text-red-500 text-sm">Quantity is required</p>
            )}
          </div>
          <div className=" sm:col-span-1">
            <button
              type="submit"
              className="w-full h-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Add Product
            </button>

            {/* <button
              type="submit"
              // onClick={handleBuyBtn}
              className=" w-full h-full text-blue-700 bg-white-700 hover:bg-blue-800 hover:text-white border border-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add product
            </button> */}
          </div>
        </div>
      </form>
    </section>
  );
};

export default SaleForm;
