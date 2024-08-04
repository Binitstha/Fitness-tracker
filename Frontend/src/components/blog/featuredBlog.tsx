import { MoveRight } from "lucide-react";
import Link from "next/link";
import BlogCard from "./blogCard";

const FeaturedBlogs = () => {
  return (
    <main className=" w-full flex flex-col gap-6">
      <div className=" flex justify-between">
        <h1 className="text-2xl">Featured Posts.</h1>
        <Link href={"/"}>
          <div className=" flex gap-2 text-blue-500">
            <p>More</p>
            <MoveRight />
          </div>
        </Link>
      </div>
      <div>
        <BlogCard />
      </div>
    </main>
  );
};

export default FeaturedBlogs;
