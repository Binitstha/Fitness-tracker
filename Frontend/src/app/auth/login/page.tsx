import { roboto } from "@/app/fonts";
import Link from "next/link";

const Signin = () => {
  return (
    <main
      className={`${roboto.className} flex justify-center items-center w-full`}
    >
      <div className="w-[35rem] flex flex-col justify-center items-center my-10 ">
        <h1 className=" text-3xl m-6">Log In</h1>
      </div>
    </main>
  );
};

export default Signin;
