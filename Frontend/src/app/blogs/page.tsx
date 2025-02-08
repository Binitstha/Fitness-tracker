"use client";

import { getLatestBlogPost } from "@/api/blog/blog";
import FeaturedBlogs from "@/components/blog/featuredBlog";
import LatestBlogs from "@/components/blog/latestBlogs";
import { blogType } from "@/types/types";
import { useEffect, useState } from "react";

const Page = () => {
  const [latestBlogs, setLatestBlogs] = useState<blogType[]>();

  useEffect(() => {
    getLatestBlogPost().then((data) => {
      setLatestBlogs(data);
    });
  }, []);

  return (
    <>
      <main className=" my-5 flex flex-col justify-center items-center">
        <FeaturedBlogs />

        {latestBlogs && latestBlogs.length > 0 && (
          <LatestBlogs data={latestBlogs} />
        )}
      </main>
    </>
  );
};

export default Page;
