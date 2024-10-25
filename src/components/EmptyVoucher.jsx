import React from "react";

const EmptyVoucher = () => {
  return (
    <tr>
      <th
        colSpan={6}
        className=" text-center text-lg px-6 py-4 group odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
      >
        There is no Voucher.
      </th>
    </tr>
  );
};

export default EmptyVoucher;
