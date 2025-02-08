"use client";

import { useState, useEffect } from "react";
import { deleteBlog, getUserBlogs } from "@/api/blog/blog";
import { blogType } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import { Trash } from "lucide-react";

const Myblogs = () => {
  const [myBlogData, setMyBlogData] = useState<blogType[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getUserBlogs();
      setMyBlogData(blogs);
    };

    fetchBlogs();
  }, []);

  const onDelete = async (id: string) => {
    await deleteBlog({ id });
    setMyBlogData((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  return (
    <>
      {myBlogData && myBlogData.length > 0 ? (
        <div className="grid grid-cols-3 self-center gap-16 p-5">
          {myBlogData.map((blog, index) => (
            <div key={index}>
              <div className="border flex flex-col justify-between pb-2 rounded-md shadow-md h-[25rem]">
                <>
                  <Link href={`/blogs/${blog.id}`}>
                    <div className="relative pb-[56%]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_LOCATION}blog/${blog.image}`}
                        alt="blogImage"
                        fill
                        objectFit="cover"
                        className="absolute top-0 left-0"
                      />
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div className="flex flex-col">
                        <h3 className="text-base">{blog.title}</h3>
                        <div className="text-xs flex w-full gap-5">
                          <div>{blog.createdAt}</div>
                        </div>
                      </div>
                      <div>{blog.category}</div>
                    </div>
                    <div className="p-3 text-sm w-full overflow-hidden whitespace-nowrap text-ellipsis h-10">
                      {blog.content}
                    </div>
                  </Link>
                </>
                <div className="flex justify-end px-3">
                  <Button
                    onClick={() => onDelete(blog.id as string)}
                    className="w-fit"
                  >
                    <Trash className="text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>No blogs available</>
      )}
    </>
  );
};

export default Myblogs;
