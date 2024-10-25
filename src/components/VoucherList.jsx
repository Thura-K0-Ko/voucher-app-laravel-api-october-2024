import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HiComputerDesktop } from "react-icons/hi2";
import useSWR from "swr";

import ProductRowSkeletonLoader from "./ProductRowSkeletonLoader";
import { Link } from "react-router-dom";

import VoucherListRow from "./VoucherListRow";
import EmptyVoucher from "./EmptyVoucher";
import { debounce } from "lodash";
import Pagination from "./Pagination";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const VoucherList = () => {
  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + `/vouchers`
  );
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce((e) => {
    setFetchUrl(import.meta.env.VITE_API_URL + `/vouchers?q=${e.target.value}`);
    console.log(e.target.value);
  }, 500);

  const updateUrl = (url) => {
    setFetchUrl(url);
  };
  // if (isLoading) {
  //   console.log("loading");
  // } else {
  //   console.log(data.links);
  // }
  return (
    <div className="">
      <div className="">
        <div className=" flex justify-between items-center mb-3">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <HiSearch />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Voucher"
              required
              onChange={handleSearch}
            />
          </div>
          <Link
            to={"/sale"}
            className=" flex  items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Sale
            <HiComputerDesktop />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #Voucher ID
              </th>
              <th scope="col" className="px-6 py-3">
                PRODUCT NAME
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Customer Email
              </th>
              <th scope="col" className="px-6 py-3 text-nowrap text-end">
                CREATED AT
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ProductRowSkeletonLoader />
            ) : data?.data?.length > 0 ? (
              data?.data?.map((voucher) => (
                <VoucherListRow key={voucher.id} voucher={voucher} />
              ))
            ) : (
              <EmptyVoucher />
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && (
        <Pagination
          links={data?.links}
          meta={data?.meta}
          updateUrl={updateUrl}
        />
      )}
    </div>
  );
};

export default VoucherList;
