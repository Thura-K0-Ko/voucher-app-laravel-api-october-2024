import React, { useState } from "react";

import { waveform } from "ldrs";
waveform.register();

// Default values shown

import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { useSWRConfig } from "swr";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ShowDate from "./ShowDate";
const ProductRow = ({
  product: { id, product_name, price, created_at, updated_at },
}) => {
  const { mutate } = useSWRConfig();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelProduct = async () => {
    setIsDeleting(true);

    const res = await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    console.log(res.status)
    if (res.status === 200) {
      await mutate(import.meta.env.VITE_API_URL + `/products`);

      toast.success(json.message);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {id}
        </th>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {product_name}
        </th>
        <td className="px-6 py-4 text-end">{price}</td>

        <td className="px-6 py-4 text-end">
          <ShowDate timeStamp={created_at} />
        </td>
        <td className="px-6 py-4 text-end">
          <ShowDate timeStamp={updated_at} />
        </td>
        <td className="px-6 py-4 text-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Link
              to={`/product/edit/${id}`}
              className="size-10 flex items-center justify-center text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:scale-105 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              <HiOutlinePencil />
            </Link>

            <button
              onClick={handleDelProduct}
              type="button"
              className=" size-10 flex items-center justify-center text-sm font-medium text-red-500 bg-transparent border border-gray-900 rounded-e-lg hover:scale-105 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              {isDeleting ? (
                <l-waveform
                  size="12"
                  stroke="1"
                  speed="1"
                  color="red"
                ></l-waveform>
              ) : (
                <HiOutlineTrash />
              )}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductRow;
