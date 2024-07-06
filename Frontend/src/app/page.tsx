import NavBar from "@/components/navBar";
import { roboto_mono } from "./fonts";

const page = () => {
  return (
    <>
      <main className={`${roboto_mono.className}`}><NavBar/></main>
    </>
  );
};

export default page;
