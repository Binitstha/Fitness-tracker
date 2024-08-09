"use client";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const blogContent = [
  {
    id: 1,
    title: "Title 1",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 1",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 2,
    title: "Title 2",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 2",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 3,
    title: "Title 3",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 3",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 2,
    title: "Title 2",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 2",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 3,
    title: "Title 3",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 3",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 2,
    title: "Title 2",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 2",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 3,
    title: "Title 3",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 3",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 2,
    title: "Title 2",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 2",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 3,
    title: "Title 3",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 3",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 2,
    title: "Title 2",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 2",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 3,
    title: "Title 3",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    category: "Category 3",
    auther: "Author",
    time: "a min ago",
    photo: "/1722762471470.jpeg",
  },
];

const LatestBlogs = () => {
  return (
    <main className="w-full flex flex-col gap-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Latest Posts</h1>
        <Link href={"/"}>
          <div className="flex gap-2 text-blue-500 items-center">
            <p>More</p>
            <MoveRight />
          </div>
        </Link>
      </div>
      <div className="flex gap-5 p-7">
        <div className="w-full lg:w-2/3 h-full">
          <Link href={`blogs/${blogContent[0].id}`}>
            <div className="border rounded-md shadow-md">
              <div className="relative pb-[56.25%]">
                <Image
                  src={blogContent[0].photo}
                  alt="blogImage"
                  fill
                  className="object-cover absolute top-0 left-0"
                />
              </div>
              <div className="p-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-base">{blogContent[0].title}</h3>
                  <div className="text-xs flex w-full gap-5">
                    <div>{blogContent[0].auther}</div>
                    <div>{blogContent[0].time}</div>
                  </div>
                </div>
                <div className="text-blue-500">{blogContent[0].category}</div>
              </div>
              <div className="p-3 text-sm">{blogContent[0].content}</div>
            </div>
          </Link>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-5 overflow-scroll px-10 p-2 h-[39rem]">
          {blogContent.slice(1).map((blog, index) => (
            <div key={index} className="border rounded-md shadow-md">
              <Link href={`blogs/${blog.id}`}>
                <div className="relative pb-[56.25%]">
                  <Image
                    src={blog.photo}
                    alt="blogImage"
                    fill
                    className="object-cover absolute top-0 left-0"
                  />
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="text-base">{blog.title}</h3>
                    <div className="text-xs flex w-full gap-5">
                      <div>{blog.auther}</div>
                      <div>{blog.time}</div>
                    </div>
                  </div>
                  <div className="text-blue-500">{blog.category}</div>
                </div>
                <div className="p-3 text-sm">{blog.content}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LatestBlogs;
