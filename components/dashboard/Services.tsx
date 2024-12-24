"use client";

import axiosInstance from "@/lib/axiosInstance";
import { fetchServices, toastError } from "@/lib/functions";
import { setService } from "@/lib/redux/serviceSlice";
import { RootState } from "@/lib/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";

const Services = () => {
  const services = useSelector((state: RootState) => state.service.services);
  const dispatch = useDispatch();

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

  return (
    <div className="flex gap-x-2 justify-around max-w-full overflow-x-auto no_scrollbar">
      {services.length
        ? services.map((service) => (
            <Link
              href={`/service/${service.service_code}`}
              key={service.service_code}
              className="flex flex-col items-center gap-y-1 min-w-24 max-w-24 overflow-hidden hover:translate-x-1 hover:-translate-y-1 hover:shadow transition"
            >
              <img src={service.service_icon} className="size-16" />
              <p className="text-center text-sm">{service.service_name}</p>
            </Link>
          ))
        : Array(12)
            .fill("a")
            .map((item, i) => (
              <Skeleton className="min-w-24 min-h-28" key={i} />
            ))}
    </div>
  );
};
export default Services;
