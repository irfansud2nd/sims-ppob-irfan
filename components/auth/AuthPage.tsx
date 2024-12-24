import LoginForm from "../../components/auth/LoginForm";
import logo from "@/public/assets/Logo.png";
import Link from "next/link";
import UserForm from "../form/UserForm";

const AuthPage = ({ register }: { register?: boolean }) => {
  return (
    <div className="min-h-screen relative">
      <div className="grid md:grid-cols-2  xl:container xl:mx-auto min-h-screen">
        <div className="flex flex-col items-center justify-center h-full mx-auto max-w-96 gap-y-6 py-4">
          <h1 className="font-medium text-lg">
            <img
              src={logo.src}
              className="inline-block rounded-full size-8 mr-2"
            />
            SIMS PPOB-IRFAN
          </h1>

          <h2 className="text-2xl font-semibold text-center">
            {register
              ? "Lengkapi data untuk membuat akun"
              : "Masuk atau buat akun untuk memulai"}
          </h2>
          {register ? <UserForm /> : <LoginForm />}

          <p>
            <span>
              {register
                ? "Sudah punya akun? login"
                : "Belum punya akun? registrasi"}
            </span>
            <Link
              href={`/${register ? "login" : "register"}`}
              className="font-medium text-custom-red"
            >
              {" "}
              di sini
            </Link>
          </p>
        </div>
        <div className=" flex items-center justify-center max-h-full max-md:hidden">
          <img src="assets/Illustrasi Login.png" className="w-[400px] " />
        </div>
      </div>
      <div className="ml-auto h-full top-0 bg-[#fff1f0] w-1/2 absolute left-1/2 -z-10 max-md:hidden" />
    </div>
  );
};
export default AuthPage;
