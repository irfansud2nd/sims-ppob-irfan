"use client";

import UserForm from "@/components/form/UserForm";
import ChangeProfilePic from "@/components/form/ChangeProfilePic";
import { clearSession } from "@/lib/auth/authActions";
import { ProfileSchema } from "@/lib/auth/authConstants";
import { fetchUser, toastError } from "@/lib/functions";
import { RootState } from "@/lib/redux/store";
import { setUser } from "@/lib/redux/userSlice";
import { LoaderCircle } from "lucide-react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const metadata: Metadata = {
  title: "Akun",
};

const Account = () => {
  const [onEdit, setOnEdit] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const getUser = async () => {
    try {
      const user = await fetchUser();
      dispatch(setUser(user));
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    if (!user) getUser();
  }, []);

  if (!user)
    return (
      <p className="my-4 text-center">
        Memuat informasi akun
        <LoaderCircle className="animate-spin inline ml-2" size={24} />
      </p>
    );

  const handleOnComplete = (data: ProfileSchema) => {
    dispatch(
      setUser({ ...user, first_name: data.firstName, last_name: data.lastName })
    );
  };

  const handleLogout = async () => {
    await clearSession();
    setUser(undefined);
    router.push("/login");
  };

  return (
    <div>
      <div className="my-4">
        <ChangeProfilePic />
        <h2 className="text-2xl font-bold mt-2 w-fit mx-auto">
          {user.first_name} {user.last_name}
        </h2>
      </div>
      <UserForm
        profile={{
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          onComplete: handleOnComplete,
        }}
        readOnly={!onEdit}
      />
      <button
        className="w-full py-1.5 rounded text-custom-red border-2 border-custom-red mt-2"
        onClick={() => setOnEdit((prev) => !prev)}
      >
        {onEdit ? "Batalkan" : "Edit Profil"}
      </button>
      {!onEdit && (
        <button onClick={handleLogout} className="btn_red mt-2">
          Logout
        </button>
      )}
    </div>
  );
};
export default Account;
