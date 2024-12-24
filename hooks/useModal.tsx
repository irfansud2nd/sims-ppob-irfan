"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Check, LoaderCircle, X } from "lucide-react";
import React, { useState } from "react";
import logo from "@/public/assets/Logo.png";
import { formatToRupiah } from "@/lib/functions";
import Link from "next/link";

type ModalType = "error" | "success" | "question" | "loading";

type ModalProps = {
  type: ModalType;
  label: string;
  amount: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  closeModal: (value: boolean) => void;
};

const Modal = ({
  type,
  label,
  amount,
  open,
  setOpen,
  closeModal,
}: ModalProps) => {
  const isQuestion = type === "question";
  const isSuccess = type == "success";
  const isLoading = type == "loading";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-fit">
        <DialogTitle className="sr-only" />
        <DialogDescription className="sr-only" />
        <div
          className="flex flex-col items-center justify-center"
          style={{ height: "200px", width: "250px" }}
        >
          {isLoading ? (
            <>
              <LoaderCircle
                size={80}
                style={{ animation: "spin_ 1s linear infinite" }}
              />
              <p className="mt-2">{label}</p>
            </>
          ) : (
            <>
              {isQuestion ? (
                <img
                  src={logo.src}
                  alt="logo"
                  className="rounded-full w-10 h-10"
                />
              ) : (
                <div
                  className="rounded-full "
                  style={{
                    backgroundColor: isSuccess ? "#22c55e" : "#f42619",
                    padding: "6px 6px",
                  }}
                >
                  {type === "success" ? (
                    <Check size={30} stroke="white" />
                  ) : (
                    <X size={30} stroke="white" />
                  )}
                </div>
              )}

              <p className="mt-3 text-sm text-center">{label}</p>
              {amount > 0 && (
                <p className="text-2xl font-bold">
                  {formatToRupiah(amount)} {isQuestion && "?"}
                </p>
              )}
              {!isQuestion && (
                <p className="mb-1">
                  {type === "success" ? "Berhasil" : "Gagal"}
                </p>
              )}

              {isQuestion ? (
                <div className="flex flex-col gap-2 mt-3">
                  <button
                    onClick={() => closeModal(true)}
                    className="text-custom-red font-medium"
                  >
                    Ya, lanjutkan bayar
                  </button>
                  <button
                    className="text-gray-700"
                    onClick={() => closeModal(false)}
                  >
                    Batalkan
                  </button>
                </div>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="text-custom-red font-medium mt-3"
                >
                  Kembali ke beranda
                </Link>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const useModal = () => {
  const [state, setState] = useState<{
    open: boolean;
    label: string;
    amount: number;
    type: ModalType;
    resolve?: (value: boolean) => void;
  }>({
    open: false,
    label: "",
    amount: 0,
    type: "success",
  });

  const showModal = async (
    label: string,
    type: ModalType,
    amount: number = 0
  ): Promise<boolean> => {
    closeModal(false);
    if (type === "question") {
      return new Promise<boolean>((resolve) => {
        setState({ open: true, label, amount, type, resolve });
      });
    } else {
      setState({ open: true, label, amount, type });
      return false;
    }
  };

  const closeModal = (result?: boolean) => {
    if (state.resolve) {
      state.resolve(result || false);
    }
    setState((prev) => ({ ...prev, open: false, resolve: undefined }));
  };

  return {
    Modal: (
      <Modal
        type={state.type}
        label={state.label}
        amount={state.amount}
        open={state.open}
        setOpen={(open) => {
          setState((prev) => ({ ...prev, open }));
          if (!open) closeModal(false);
        }}
        closeModal={closeModal}
      />
    ),
    showModal,
  };
};

export default useModal;
