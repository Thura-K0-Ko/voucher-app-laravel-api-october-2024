import React, { useState } from "react";

import { waveform } from "ldrs";
waveform.register();

// Default values shown

import {
  HiOutlineArrowRight,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useSWRConfig } from "swr";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ShowDate from "./ShowDate";
const VoucherListRow = ({
  voucher: {
    id,
    voucher_id,
    customer_name,
    customer_email,
    sale_date,
    created_at,
    total,
  },
}) => {
  const { mutate } = useSWRConfig();

  const [isDeleting, setIsDeleting] = useState(false);
  // const date = new Date(sale_date);
  // const currentDate = date.toLocaleDateString("en-GB", {
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });
  // const currentTime = date.toLocaleTimeString("en-GB", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: true,
  // });

  const handleDelProduct = async () => {
    setIsDeleting(true);

    await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
      method: "DELETE",
    });

    toast.success("Voucher deleted successfully");
    setIsDeleting(false);
    await mutate(import.meta.env.VITE_API_URL + `/vouchers`);
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
          {voucher_id}
        </th>
        <th
          scope="row"
          className=" flex flex-col px-6 py-4 font-medium whitespace-nowrap dark:text-white"
        >
          <span className=" text-gray-900">{customer_name}</span>
          <span>{customer_email}</span>
        </th>
        <td className="px-6 py-4 text-end">{total}</td>

        <td className="px-6 py-4 text-end">
          {/* <p className=" text-xs">{currentDate}</p>
          <p className=" text-xs">{currentTime}</p> */}
          <ShowDate timeStamp={created_at} />
        </td>
        <td className="px-6 py-4 text-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={handleDelProduct}
              type="button"
              className=" size-8 flex items-center justify-center text-sm font-medium text-red-500 bg-transparent border  border-gray-900 rounded-s-lg hover:scale-105 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
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
            <Link
              to={`/voucher/detail/${id}`}
              type="button"
              className=" size-8 flex items-center justify-center text-sm font-medium bg-transparent border  border-gray-900 rounded-e-lg hover:scale-105 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              <HiOutlineArrowRight />
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
};

export default VoucherListRow;
