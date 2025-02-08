"use client";
import { getSingleBlog } from "@/api/blog/blog";
import { Separator } from "@/components/ui/separator";
import { blogType } from "@/types/types";
import Image from "next/image";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";

async function BlogContent({ id }: { id: string }) {
  const blog: blogType = await getSingleBlog({ id });

  return (
    <>
      {blog && (
        <main className=" mt-10 lg:mx-20 m-5">
          <div>
            <div>
              <h1 className="text-4xl mb-3">{blog.title}</h1>
              <div className="my-1 justify-start items-center h-5 flex gap-3">
                <p>
                  {blog.author.firstName} {blog.author.lastName}
                </p>
                <Separator orientation="vertical" />
                <p>{blog.category}</p>
                <Separator orientation="vertical" />
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <div className="relative my-10 rounded-md shadow-lg w-full h-0 pb-[40%] overflow-hidden mx-auto max-w-screen-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_LOCATION}blog/${blog.image}`}
                  alt="BlogImage"
                  fill
                  style={{ objectFit: "cover" }}
                  className="absolute top-0 left-0 transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
              <p className="mt-2 text-center text-gray-500">{blog.title}</p>
            </div>
            <div>
              <div className="prose lg:prose-xl leading-8">
                <ReactMarkdown>{blog.content.toString()}</ReactMarkdown>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<>loading...</>}>
      <BlogContent id={params.id} />
    </Suspense>
  );
}
