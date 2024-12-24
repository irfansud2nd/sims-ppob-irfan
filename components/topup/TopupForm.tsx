"use client";

import useModal from "@/hooks/useModal";
import { formatToRupiah, toastError } from "@/lib/functions";
import {
  TopupSchema,
  topupSchema,
} from "@/lib/transaction/transactionConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputWithIcon from "../form/InputWithIcon";
import { Banknote } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { useDispatch } from "react-redux";
import { addBalance } from "@/lib/redux/balanceSlice";

const TopupForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TopupSchema>({
    resolver: zodResolver(topupSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const { Modal, showModal } = useModal();

  const onSubmit = async (data: TopupSchema) => {
    try {
      const result = await showModal(
        "Anda yakin untuk Top Up sebesar",
        "question",
        data.amount
      );
      if (!result) return;
      showModal("Memproses Top Up", "loading");

      await axiosInstance.post("/topup", {
        top_up_amount: data.amount,
      });

      showModal("Top Up sebesar", "success", data.amount);

      dispatch(addBalance(data.amount));
      reset();
    } catch (error) {
      showModal("Top Up sebesar", "error", data.amount);
      toastError(error);
    }
  };

  const shortcuts = [10000, 20000, 50000, 100000, 250000, 500000];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-md:flex-col w-full gap-2"
    >
      {Modal}
      <div className="md:w-3/5">
        <InputWithIcon
          icon={Banknote}
          register={register}
          name="amount"
          type="number"
          placeholder="Masukan nominal Top up"
          error={errors.amount}
        />
        <button type="submit" className="btn_red" disabled={isSubmitting}>
          Top up
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 md:w-2/5 max-md:order-first">
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut}
            onClick={() => setValue("amount", shortcut)}
            type="button"
            className="border h-fit px-2 py-2 rounded"
          >
            {formatToRupiah(shortcut)}
          </button>
        ))}
      </div>
    </form>
  );
};
export default TopupForm;
