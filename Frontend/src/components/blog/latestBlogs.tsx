"use client";
import Link from "next/link";
import Image from "next/image";
import { blogType } from "@/types/types";
import { getLatestBlogPost } from "@/api/blog/blog";

const LatestBlogs = async () => {
  const latestBlogs: blogType[] = await getLatestBlogPost();

  return (
    <>
      <main className="w-full flex flex-col gap-6 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Latest Posts</h1>
          <Link href={"/"}>
            <div className="flex gap-2 text-blue-500 items-center">
              <p>More...</p>
            </div>
          </Link>
        </div>
        {latestBlogs && latestBlogs.length > 0 ? (
          <div className="flex gap-5 p-7">
            <div className="w-full lg:w-2/3 h-full">
              <Link href={`blogs/${latestBlogs[0].id}`}>
                <div className="border pb-4 rounded-md shadow-md">
                  <div className="relative pb-[56.25%]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_LOCATION}blog/${latestBlogs[0].image}`}
                      alt="blogImage"
                      fill
                      className="object-cover absolute top-0 left-0"
                    />
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="text-base">{latestBlogs[0].title}</h3>
                      <div className="text-xs flex w-full gap-5">
                        <div>{latestBlogs[0].author.firstName}</div>
                        <div>
                          {new Date(
                            latestBlogs[0].createdAt,
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-blue-500">
                      {latestBlogs[0].category}
                    </div>
                  </div>
                  <div className="px-4 text-sm line-clamp-2 ">
                    {latestBlogs[0].content}
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col gap-5 overflow-scroll px-10 p-2 h-[42rem]">
              {latestBlogs.slice(1).map((blog, index) => (
                <div key={index} className="border rounded-md shadow-md pb-4">
                  <Link href={`blogs/${blog.id}`}>
                    <div className="relative pb-[56.25%]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_LOCATION}blog/${blog.image}`}
                        alt="blogImage"
                        fill
                        className="object-cover absolute top-0 left-0"
                      />
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div className="flex flex-col">
                        <h3 className="text-base">{blog.title}</h3>
                        <div className="text-xs flex w-full gap-5">
                          <div>{blog.author.firstName}</div>
                          <div>
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-blue-500">{blog.category}</div>
                    </div>
                    <div className="px-3 text-sm line-clamp-2">
                      {blog.content}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>No blogs available</>
        )}
      </main>
    </>
  );
};

export default LatestBlogs;
