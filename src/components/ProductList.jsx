import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import useSWR from "swr";
import ProductRow from "./ProductRow";
import ProductRowSkeletonLoader from "./ProductRowSkeletonLoader";
import { Link } from "react-router-dom";
import EmptyProduct from "./EmptyProduct";
import { debounce } from "lodash";
import Pagination from "./Pagination";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const ProductList = () => {
  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + `/products`
  );
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce((e) => {
    // console.log(e.target.value)
    setFetchUrl(`${import.meta.env.VITE_API_URL}/products?q=${e.target.value}`);
  }, 500);
 const updateUrl=(newUrl) => {
  setFetchUrl(newUrl)
 }

  return (
    <div>
      <div>
        <div className=" flex justify-between items-center mb-3">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <HiSearch />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Product"
              onChange={handleSearch}
            />
          </div>
          <Link
            to={"/product/create"}
            className=" flex  items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add New Product
            <HiPlus />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                PRODUCT NAME
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                PRICE
              </th>
              <th scope="col" className="px-6 py-3 text-nowrap text-end">
                CREATED AT
              </th>
              <th scope="col" className="px-6 py-3 text-nowrap text-end">
                UPDATE AT
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
              data?.data?.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))
            ) : (
              <EmptyProduct />
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && <Pagination links={data?.links} meta={data?.meta} updateUrl={updateUrl} />}
      
    </div>
  );
};

export default ProductList;
