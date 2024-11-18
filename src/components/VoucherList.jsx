import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HiChevronDown, HiChevronUp, HiComputerDesktop } from "react-icons/hi2";
import useSWR from "swr";

import ProductRowSkeletonLoader from "./ProductRowSkeletonLoader";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import VoucherListRow from "./VoucherListRow";
import EmptyVoucher from "./EmptyVoucher";
import { debounce, set } from "lodash";
import Pagination from "./Pagination";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const VoucherList = () => {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + `/vouchers` + location.search
  );
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce((e) => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(
        import.meta.env.VITE_API_URL + `/vouchers?q=${e.target.value}`
      );
    } else {
      setParams({});
      setFetchUrl(import.meta.env.VITE_API_URL + `/vouchers`);
    }
    console.log(e.target.value);
  }, 500);

  const updateUrl = (url) => {
    const newUrl = new URL(url);
    const newSearchParams = new URLSearchParams(newUrl.search);
    const paramsObject = Object.fromEntries(newSearchParams);
    // console.log(paramsObject);
    setParams(paramsObject);
    setFetchUrl(url);
  };
  // if (isLoading) {
  //   console.log("loading");
  // } else {
  //   console.log(data);
  // }

  const handleSort = (sortData) => {
    setParams(sortData);
    const sortParams = new URLSearchParams(sortData).toString();

    setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers?${sortParams}`);
  };
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
                <div className="flex items-center gap-1">
                  <div className=" flex flex-col items-center ">
                    <button
                      onClick={handleSort.bind(null, {
                        sort_by: "id",
                        sort_direction: "asc",
                      })}
                      className=" cursor-pointer hover:bg-blue-400"
                    >
                      <HiChevronUp />
                    </button>
                    <button
                      onClick={handleSort.bind(null, {
                        sort_by: "id",
                        sort_direction: "desc",
                      })}
                      className=" cursor-pointer hover:bg-blue-400"
                    >
                      <HiChevronDown />
                    </button>
                  </div>
                  <span>#</span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Voucher ID
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-nowrap text-end">
                <div className="flex items-center gap-1 justify-end">
                  <div className=" flex flex-col items-center ">
                    <button
                      onClick={handleSort.bind(null, {
                        sort_by: "total",
                        sort_direction: "asc",
                      })}
                      className=" cursor-pointer hover:bg-blue-400"
                    >
                      <HiChevronUp />
                    </button>
                    <button
                      onClick={handleSort.bind(null, {
                        sort_by: "total",
                        sort_direction: "desc",
                      })}
                      className=" cursor-pointer hover:bg-blue-400"
                    >
                      <HiChevronDown />
                    </button>
                  </div>
                  <span >Total</span>
                </div>
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
