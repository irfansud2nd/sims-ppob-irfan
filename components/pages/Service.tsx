"use client";
import axiosInstance from "@/lib/axiosInstance";
import {
  fetchBalance,
  fetchServices,
  getErrorMsg,
  toastError,
} from "@/lib/functions";
import { setService } from "@/lib/redux/serviceSlice";
import { RootState } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banknote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useModal from "@/hooks/useModal";
import { reduceBalance, setBalance } from "@/lib/redux/balanceSlice";

const Service = ({ code }: { code: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const services = useSelector((state: RootState) => state.service.services);
  const service = services.find((item) => item.service_code == code);
  const balanceRedux = useSelector((state: RootState) => state.balance.balance);

  const dispatch = useDispatch();

  const { Modal, showModal } = useModal();

  const getServices = async () => {
    try {
      const services = await fetchServices();
      dispatch(setService(services));
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    if (!services.length) getServices();
  }, []);

  const handleClick = async () => {
    if (!service) return;

    const title = `Pembayaran ${service.service_name} sebesar`;
    setIsSubmitting(true);

    try {
      const result = await showModal(
        `Beli ${service.service_name} senilai`,
        "question",
        service.service_tariff
      );

      if (!result) return;

      showModal("Memeriksa saldo", "loading");

      const balance = await fetchBalance();

      if (balance !== balanceRedux) dispatch(setBalance(balance));

      if (balance < service.service_tariff) {
        throw `Saldo tidak mencukupi untuk pembayaran ${service.service_name} sebesar`;
      }

      showModal("Memperoses pembayaran", "loading");
      await axiosInstance.post("/transaction", {
        service_code: service.service_code,
      });

      showModal(title, "success", service.service_tariff);
      dispatch(reduceBalance(service.service_tariff));
    } catch (error) {
      showModal(getErrorMsg(error, title), "error", service.service_tariff);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (services.length && !service)
    return <p className="my-2 text-center">Service tidak ditemukan</p>;

  return (
    <div>
      {Modal}
      <p className="font-medium">Pembayaran</p>
      <div className="flex gap-x-2 items-center mb-4">
        {service ? (
          <>
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="w-10 h-auto"
            />
            <h1 className="font-bold text-2xl">{service.service_name}</h1>
          </>
        ) : (
          <>
            <Skeleton className="w-10 h-10" />
            <Skeleton className="h-8 w-20" />
          </>
        )}
      </div>

      {service ? (
        <div className="relative">
          <Input
            readOnly
            className="peer ps-9"
            type="number"
            value={service.service_tariff}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Banknote size={16} strokeWidth={2} />
          </div>
        </div>
      ) : (
        <Skeleton className="w-full h-9" />
      )}

      <button
        className="btn_red mt-2"
        disabled={!service || isSubmitting}
        onClick={handleClick}
      >
        Bayar
      </button>
    </div>
  );
};
export default Service;
