import Link from "next/link";
import { Card } from "../ui/card";

const BlogsSkeleton = () => {
  return (
    <>
      <main className="my-5 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Featured Posts.</h1>
            <Link href={"/"}>
              <div className="flex gap-2 text-blue-500">
                <p>More...</p>
              </div>
            </Link>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-5 p-7">
              {[1, 2, 3].map((_, index) => (
                <Card className="h-[25.6rem] rounded-md" key={index}>
                  <div className="h-[73%] bg-gray-200 dark:bg-neutral-600 animate-pulse"></div>
                  <div className="flex flex-col gap-3 m-3">
                    <div className=" h-5 bg-gray-200 dark:bg-neutral-600 animate-pulse rounded-sm w-3/4"></div>
                    <div className=" h-5 bg-gray-200 dark:bg-neutral-600 animate-pulse rounded-sm w-2/4"></div>
                    <div className=" h-5 bg-gray-200 dark:bg-neutral-600 animate-pulse rounded-sm w-full"></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Latest Posts</h1>
            <Link href={"/"}>
              <div className="flex gap-2 text-blue-500 items-center">
                <p>More...</p>
              </div>
            </Link>
          </div>
          <div className="flex gap-5 p-7 ">
            <Card className="w-full lg:w-2/3 ">
              <div className="h-[85%] bg-gray-200 dark:bg-neutral-600 animate-pulse"></div>
              <div className="flex flex-col gap-2 m-3">
                <div className=" h-5 w-1/3 bg-gray-200 dark:bg-neutral-600 animate-pulse"></div>
                <div className=" h-5 w-2/3 bg-gray-200 dark:bg-neutral-600 animate-pulse"></div>
                <div className=" h-5 w-full bg-gray-200 dark:bg-neutral-600 animate-pulse"></div>
              </div>
            </Card>
            <div className="w-full lg:w-1/3 grid grid-row-2 gap-5 overflow-scroll px-10 p-2 h-[42rem]">
              {[1, 2].map((_, index) => (
                <Card key={index} className="border rounded-md shadow-md pb-4 h-96">
                  <div className="h-4/6 bg-gray-200 dark:bg-neutral-600 animate-pulse"></div>
                  <div className="flex flex-col gap-2 m-3">
                    <div className=" h-5 w-1/3 bg-gray-200 dark:bg-neutral-600 animate-pulse"></div>
                    <div className=" h-5 w-2/3 bg-gray-200 dark:bg-neutral-600 animate-pulse"></div>
                    <div className=" h-5 w-full bg-gray-200 dark:bg-neutral-600 animate-pulse"></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogsSkeleton;
