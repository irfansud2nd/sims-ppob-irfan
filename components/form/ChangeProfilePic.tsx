"use client";

import { RootState } from "@/lib/redux/store";
import { User, setUser } from "@/lib/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import defaultProfile from "@/public/assets/Profile Photo.png";
import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import useModal from "@/hooks/useModal";

const ChangeProfilePic = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state: RootState) => state.user.user) as User;
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { Modal, showModal } = useModal();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    showModal("Memperbaharui foto profil", "loading");
    try {
      if (!["image/jpeg", "image/png"].includes(file.type))
        throw "Format file tidak valid (hanya menerima .jpeg dan .png)";

      if (file.size > (1024 * 1024) / 10)
        throw "File terlalu besar (maksimal 100KB)";

      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.put("/profile/image", formData);
      dispatch(setUser(response.data.data));
      showModal("Memperbaharui foto profil", "success");
    } catch (error) {
      let msg = "Memperbaharui foto profil";
      if (typeof error == "string") msg = error;
      showModal(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {Modal}
      <div className="relative mx-auto w-fit h-fit">
        <img
          src={
            user.profile_image.length ? user.profile_image : defaultProfile.src
          }
          alt="Profile Preview"
          className="size-32 object-cover rounded-full"
        />
        <button
          className="absolute bottom-0 right-0 bg-white disabled:bg-gray-300 border border-gray-200 p-2 rounded-full"
          onClick={handleClick}
          disabled={isSubmitting}
        >
          <Pencil size={18} className="stroke-gray-600" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </>
  );
};
export default ChangeProfilePic;
