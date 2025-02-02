"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const blogContent = [
  {
    id: 1,
    title: "Title 1",
    content:
      "Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content ",
    category: "Category 1",
    auther: "Binit",
    time: "Time 1",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 2,
    title: "Title 2",
    content:
      "Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content ",
    category: "Category 2",
    auther: "Binit",
    time: "Time 2",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 3,
    title: "Title 3",
    content:
      "Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content ",
    category: "Category 3",
    auther: "Binit",
    time: "Time 3",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 3,
    title: "Title 3",
    content:
      "Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content ",
    category: "Category 3",
    auther: "Binit",
    time: "Time 3",
    photo: "/1722762471470.jpeg",
  },
  {
    id: 3,
    title: "Title 3",
    content:
      "Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content ",
    category: "Category 3",
    auther: "Binit",
    time: "Time 3",
    photo: "/1722762471470.jpeg",
  },
];

const BlogCard = () => {
  return (
    <div className=" flex flex-wrap gap-5 p-5">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1">
          {blogContent &&
            blogContent.map((blog, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:basis-1/2 lg:basis-1/3 rounded-md"
              >
                <Link href={`blogs/${blog.id}`}>
                  <div className="p-1">
                    <div className="border rounded-md shadow-md">
                      <div className="relative pb-[56%]">
                        <Image
                          src={`${blog.photo}`}
                          alt="blogImage"
                          fill
                          objectFit="cover"
                          className=" absolute top-0 left-0"
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
                        <div>{blog.category}</div>
                      </div>
                      <div className="p-3 text-sm w-full overflow-hidden whitespace-nowrap text-ellipsis h-10">
                        {blog.content}
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BlogCard;
