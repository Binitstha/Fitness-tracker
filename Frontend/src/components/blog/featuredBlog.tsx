import Link from "next/link";
import BlogCard from "./blogCard";
import { blogType } from "@/types/types";
import { getFeaturedBlogs, getUserBlogs } from "@/api/blog/blog";

const FeaturedBlogs = async () => {
  const featuredBlogs: blogType[] = await getFeaturedBlogs();
  
  return (
    <>
      <main className=" w-full flex flex-col gap-6">
        <div className=" flex justify-between items-center">
          <h1 className="text-2xl">Featured Posts.</h1>
          <Link href={"/"}>
            <div className=" flex gap-2 text-blue-500">
              <p>More...</p>
            </div>
          </Link>
        </div>
        <div>
          <BlogCard featuredBlogs={featuredBlogs} />
        </div>
      </main>
    </>
  );
};

export default FeaturedBlogs;
