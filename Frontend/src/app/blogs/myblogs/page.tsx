import Myblogs from "@/components/blog/myblogs";
import { Suspense } from "react";

const Page = () => {
  return (
    <>
      <Suspense fallback={<>loading......</>}>
        <Myblogs />
      </Suspense>
    </>
  );
};

export default Page;
