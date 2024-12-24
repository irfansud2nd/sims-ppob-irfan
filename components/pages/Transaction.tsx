"use client";
import axiosInstance from "@/lib/axiosInstance";
import {
  formatDate,
  formatToRupiah,
  reduceData,
  toastError,
} from "@/lib/functions";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

type Transaction = {
  invoice_number: string;
  transaction_type: "PAYMENT" | "TOPUP";
  description: string;
  total_amount: number;
  created_on: string;
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionLoading, setTransactionLoading] = useState(true);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [showMoreDisabled, setShowMoreDisabled] = useState(false);
  const [offset, setOffset] = useState(0);

  const limit = 5;

  const getTransactions = async (offset: number) => {
    try {
      if (offset > 0) setShowMoreLoading(true);

      const response = await axiosInstance.get(
        `/transaction/history?limit=${limit}&offset=${offset}`
      );
      const data = response.data.data.records as Transaction[];

      setTransactions((prev) =>
        reduceData([...prev, ...data], "invoice_number")
      );

      if (data.length < limit) setShowMoreDisabled(true);
    } catch (error) {
      toastError(error);
    } finally {
      if (offset == 0) {
        setTransactionLoading(false);
      } else {
        setShowMoreLoading(false);
      }
    }
  };

  const showMore = () => {
    getTransactions(offset + limit);
    setOffset((prev) => prev + limit);
  };

  useEffect(() => {
    getTransactions(0);
  }, []);

  if (transactionLoading)
    return (
      <p className="my-4 text-center">
        Memuat riwayat transaksi
        <LoaderCircle className="animate-spin inline ml-2" size={24} />
      </p>
    );

  if (!transactions.length)
    return <p className="my-4 text-center">Tidak ada riwayat transaksi</p>;

  return (
    <div className="my-2">
      <h1 className="font-medium text-xl mb-1">Semua Transaksi</h1>
      <div className="flex flex-col gap-y-2">
        {transactions.map(
          ({
            total_amount,
            description,
            transaction_type,
            created_on,
            invoice_number,
          }) => (
            <div
              className="border rounded px-4 py-2 flex justify-between"
              key={invoice_number}
            >
              <div>
                <p
                  className={`text-xl font-semibold ${
                    transaction_type == "PAYMENT"
                      ? "text-custom-red"
                      : "text-green-500"
                  }`}
                >
                  <span className="mr-2 w-2 inline-block">
                    {transaction_type == "PAYMENT" ? "-" : "+"}
                  </span>
                  {formatToRupiah(total_amount)}
                </p>
                <p className="text-sm">{formatDate(created_on)}</p>
              </div>
              <p className="text-sm">{description}</p>
            </div>
          )
        )}
        {!showMoreDisabled && (
          <button
            className="mx-auto text-custom-red font-medium disabled:text-gray-700"
            onClick={showMore}
            disabled={showMoreLoading}
          >
            {showMoreLoading ? (
              <>
                <span>Memuat data</span>
                <LoaderCircle className="animate-spin inline" size={24} />
              </>
            ) : (
              "Show more"
            )}
          </button>
        )}
      </div>
    </div>
  );
};
export default TransactionHistory;
