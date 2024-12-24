import LoginForm from "../../components/auth/LoginForm";
import logo from "@/public/assets/Logo.png";
import Link from "next/link";
import UserForm from "../form/UserForm";

const AuthPage = ({ register }: { register?: boolean }) => {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center h-full mx-auto max-w-96 gap-y-6 py-4">
        <h1 className="font-medium text-lg">
          <img
            src={logo.src}
            className="inline-block rounded-full size-8 mr-2"
          />
          SIMS PPOB IRFAN
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
      <div className="bg-[#fff1f0] flex items-center justify-center max-h-full">
        <img src="assets/Illustrasi Login.png" className="w-[400px] " />
      </div>
    </div>
  );
};
export default AuthPage;
