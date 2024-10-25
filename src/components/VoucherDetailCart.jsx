import html2pdf from "html2pdf.js";
import printJS from "print-js";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const VoucherDetailCart = () => {
  const { id } = useParams();
// console.log(id)
  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + `/vouchers/` + id,
    fetcher
  );
  
  const handlePrint = () => {
    printJS({
      printable: "print-area", // The id of the HTML element to print
      type: "html",
      css: [
        "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css",
      ], // Use Tailwind CSS to style print content]

      scanStyles: true,
    });
  };

  const handleDownloadPDF = () => {

    const element = document.getElementById("print-area"); // Select the part you want to export
    html2pdf()
      .set({
        margin: 0,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a5", orientation: "portrait" },
      })
      .from(element)
      .save();
  };


// const handlePrint = () => {
//   window.print();
// };
// if (isLoading) return <p>loading...</p>;
// console.log(typeof data.tax, data.total, data.netTotal);
// console.log(data);
// console.log(data);
return (
  <>
    {!isLoading && (
      <div className="flex">
        <div id="print-area" className="w-[14.8cm] p-8 bg-white shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">INVOICE</h1>
              <p className="text-gray-600">{data.data.voucher_id}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">Invoice to</p>
              <p>{data.data.customer_name}</p>
              <p>Date: {data.data.sale_date}</p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm">No</th>
                <th className="text-left py-2 text-sm">Description</th>
                <th className="text-right py-2 text-sm">Qty</th>
                <th className="text-right py-2 text-sm">Price</th>
                <th className="text-right py-2 text-sm">Total</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td>loading..</td>
                </tr>
              ) : (
                data?.data?.records.map((record, index) => (
                  <tr key={record.id} className="border-b">
                    <td className="py-2 text-sm">{index + 1}</td>
                    <td className="py-2 text-sm">
                      {record.product.product_name}
                      <br />
                      Renew lifespan ( 15.9.2025 )
                    </td>
                    <td className="text-right py-2 text-sm">
                      {record.quantity}
                    </td>
                    <td
                      onClick={handlePrint}
                      className="text-right py-2 text-sm"
                    >
                      {record.product.price}
                    </td>
                    <td className="text-right py-2 text-sm">{record.cost}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="border-b font-medium">
                <td className="text-right py-4 text-sm" colSpan={4}>
                  Total
                </td>
                <td className="text-right py-4 text-sm">
                  {parseFloat(data.data.total).toFixed(2)}
                </td>
              </tr>
              <tr className="border-b font-medium">
                <td className="text-right py-4 text-sm" colSpan={4}>
                  Tax (7%)
                </td>
                <td className="text-right py-4 text-sm">
                  {parseFloat(data.data.tax).toFixed(2)}
                </td>
              </tr>
              <tr className="border-b font-medium">
                <td className="text-right py-4 text-sm" colSpan={4}>
                  Net Total
                </td>
                <td className="text-right py-4 text-sm">
                  {parseFloat(data.data.net_total).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className=" grid grid-cols-2 text-sm">
            <div className="cols-span-1">
              <p className="font-bold mb-2">Payment Transfer to</p>
              <p>Kpay/Wave: 09250152018</p>
              <p>KBZ Bank: 037301027050256501</p>
              <p>AYA Bank: 20003674121</p>
            </div>
            <div className=" col-span-1 text-right text-sm ">
              <h3 className="font-bold mb-2 text-xl">MMS IT</h3>

              <p>48, 1st Floor, Shan Kone St,</p>
              <p>+959-250-152-018</p>
              <p>enquiry@mms-it.com</p>
            </div>
          </div>

          <div className="mt-8 border-t text-center font-medium text-sm">
            <p className="mt-4">Thanks to You</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handlePrint}
            className="flex  items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex  items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Download Pdf
          </button>
        </div>
      </div>
    )}
  </>
);
};

export default VoucherDetailCart;
