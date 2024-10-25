import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { useSWRConfig } from "swr";

import { tailChase } from "ldrs";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import EditProductCartSkeletonLoader from "./EditProductCartSkeletonLoader";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const EditProductCart = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { productId } = useParams();
  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_API_URL + `/products/${productId}`,
    fetcher
  );

  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  console.log(productId);
  const [saving, setSaving] = useState(false);
  const onSubmit = async (data) => {
    const created_at = new Date().toISOString();
    setSaving(true);
    tailChase.register();
    const res = await fetch(
      import.meta.env.VITE_API_URL + `/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: data.product_name,
          price: data.price,
          created_at,
        }),
      }
    );
    if (data.back_to_product_list) {
      navigate("/product");
    }
    mutate(import.meta.env.VITE_API_URL + `/products`);

    setSaving(false);
    toast.success("Product Update successful");
    console.log(data);
  };
  return (
    <div className=" w-full sm:w-2/3 md:w-1/2">
      <h1 className=" font-bold text-3xl mb-2">Edit Product</h1>
      <p className="mb-5 text-stone-500">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
        dolorem, quasi repellendus quo excepturi quaerat non?
      </p>

      {isLoading ? (
        <EditProductCartSkeletonLoader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ==================form input================= */}
          <div className="mb-5">
            <label
              className={`block mb-2 text-sm font-medium   ${
                errors.product_name
                  ? "text-red-500 dark:text-red-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              Product Name
            </label>
            <input
              type="text"
              defaultValue={data.data.product_name}
              {...register("product_name", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
              className={`bg-gray-50 border ${
                errors.product_name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500  dark:border-red-600  dark:focus:ring-red-500 dark:focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`}
              placeholder="eg.apple"
            />
            {errors.product_name?.type === "required" && (
              <p className="text-red-500 text-sm">Product Name is required</p>
            )}
            {errors.product_name?.type === "minLength" && (
              <p className="text-red-500">
                {" "}
                Product Name must be greater then 3 characters
              </p>
            )}
            {errors.product_name?.type === "maxLength" && (
              <p className="text-red-500">
                {" "}
                Product Name must be less then 20 characters
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              className={`block mb-2 text-sm font-medium   ${
                errors.price
                  ? "text-red-500 dark:text-red-500"
                  : "text-gray-900 dark:text-white"
              }  `}
            >
              Product Price
            </label>
            <input
              type="number"
              defaultValue={data.data.price}
              {...register("price", {
                required: true,
                min: 100,
                max: 10000,
              })}
              className={`bg-gray-50 border ${
                errors.price
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500  dark:border-red-600  dark:focus:ring-red-500 dark:focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`}
              placeholder="eg.100"
            />
            {errors.price?.type === "required" && (
              <p className="text-red-500 text-sm">Product Price is required</p>
            )}
            {errors.price?.type === "min" && (
              <p className="text-red-500 text-xs">
                {" "}
                Product Price must be greater then 100
              </p>
            )}
            {errors.price?.type === "max" && (
              <p className="text-red-500 text-xs">
                {" "}
                Product Price must be less then 10000
              </p>
            )}
          </div>
          {/* ==================form sure checkbox================= */}

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                {...register("all_correct", { required: true })}
                type="checkbox"
                className="w-4 h-4 border border-gray-300 cursor-pointer rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
              {errors.all_correct && (
                <p className=" ps-2 text-red-500 text-xs">Check this box</p>
              )}
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              Make sure all field are correct
            </label>
          </div>
          {/* ==================form back to product checkbox================= */}

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="back_to_product_list"
                {...register("back_to_product_list")}
                type="checkbox"
                checked
                className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="back_to_product_list"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              Back to product list after saving
            </label>
          </div>
          {/* ==================form button================= */}

          <div className=" flex items-center gap-2 justify-start">
            <Link
              to={"/product"}
              className="text-blue-700 bg-blue-200 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className=" flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span>Update product</span>
              {saving && (
                <l-tail-chase
                  size="13"
                  speed="1.75"
                  color="white"
                ></l-tail-chase>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProductCart;
