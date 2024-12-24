import axiosInstance from "@/lib/axiosInstance";

type Banner = {
  banner_name: string;
  banner_image: string;
  description: string;
};

const getBanners = async () => {
  try {
    const response = await axiosInstance.get("/banner");
    return response.data.data as Banner[];
  } catch (error) {
    throw error;
  }
};
const Banners = async () => {
  const banners = await getBanners();
  return (
    <>
      <h1 className="font-medium text-lg">Temukan promo menarik</h1>
      <div className="flex gap-x-4 justify-around max-w-full overflow-x-auto no_scrollbar">
        {banners.map((banner) => (
          <img
            src={banner.banner_image}
            alt={banner.banner_name}
            key={banner.banner_name}
          />
        ))}
      </div>
    </>
  );
};
export default Banners;
