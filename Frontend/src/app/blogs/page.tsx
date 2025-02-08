"use client";

import FeaturedBlogs from "@/components/blog/featuredBlog";
import LatestBlogs from "@/components/blog/latestBlogs";
import BlogsSkeleton from "@/components/skeleton/blogs";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<BlogsSkeleton />}>
      <main className=" my-5 flex flex-col justify-center items-center">
        <FeaturedBlogs />
        <LatestBlogs />
      </main>
    </Suspense>
  );
};

export default Page;
