"use client";
import defaultProfile from "@/public/assets/Profile Photo.png";
import backgroundSaldo from "@/public/assets/Background Saldo.png";
import { useEffect, useState } from "react";
import {
  formatToRupiah,
  fetchBalance,
  toastError,
  fetchUser,
} from "@/lib/functions";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/lib/redux/userSlice";
import { RootState } from "@/lib/redux/store";
import { Skeleton } from "./ui/skeleton";
import { setBalance, setBalanceLoading } from "@/lib/redux/balanceSlice";
import { Eye, EyeClosed } from "lucide-react";
const UserInfo = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const { balance, balanceLoading } = useSelector(
    (state: RootState) => state.balance
  );

  const getInfo = async () => {
    try {
      const profile = await fetchUser();
      dispatch(setUser(profile));

      const balance = await fetchBalance();
      dispatch(setBalance(balance));
      dispatch(setBalanceLoading(false));
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="w-full xl:mx-auto xl:container flex max-md:flex-col items-center py-4">
      <div className="sm:w-2/5 flex flex-col max-md:items-center max-md:text-center">
        <img
          src={
            user?.profile_image.length ? user.profile_image : defaultProfile.src
          }
          alt="Profile"
          className="rounded w-20 object-contain object-center"
        />
        <p className="text-lg font-medium">Selamat datang,</p>
        {user ? (
          <h3 className="text-2xl sm:text-3xl font-bold">
            {user.first_name} {user.last_name}
          </h3>
        ) : (
          <Skeleton className="h-9 w-60" />
        )}
      </div>

      <div className="w-fit ml-auto max-w-[60] relative max-md:mt-2">
        <img src={backgroundSaldo.src} className="ml-auto object-cover" />
        <div className="absolute top-0 left-0 right-0 bottom-0 px-3 flex flex-col justify-center text-white">
          <p className="text-lg font-medium mb-1 sm:mb-3">Saldo anda</p>
          {balanceLoading ? (
            <Skeleton className="h-9 w-32" />
          ) : (
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {balanceVisible ? formatToRupiah(balance) : "Rp ••••••"}
            </h3>
          )}
          <button
            className="w-fit mt-1 sm:mt-3 flex items-center gap-x-1"
            onClick={() => setBalanceVisible((prev) => !prev)}
          >
            <span>{balanceVisible ? "Tutup" : "Lihat"} saldo</span>
            {balanceVisible ? <Eye size={18} /> : <EyeClosed size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
