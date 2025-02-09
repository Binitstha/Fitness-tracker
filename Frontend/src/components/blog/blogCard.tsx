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
import { blogType } from "@/types/types";

const BlogCard = ({ featuredBlogs }: { featuredBlogs: blogType[] }) => {
  return (
    <>
      {featuredBlogs && featuredBlogs.length > 0 ? (
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
              {featuredBlogs.map((blog, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:basis-1/2 lg:basis-1/3 rounded-md"
                >
                  <Link href={`blogs/${blog.id}`}>
                    <div className="p-1">
                      <div className="border rounded-md shadow-md">
                        <div className="relative pb-[56%]">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_LOCATION}blog/${blog.image}`}
                            alt="blogImage"
                            height={500}
                            width={500}
                            objectFit="cover"
                            className=" absolute top-0 left-0"
                          />
                        </div>
                        <div className="p-3 flex justify-between items-center gap-1">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-base line-clamp-2">{blog.title}</h3>
                            <div className="text-xs flex w-full gap-5">
                              <div>{blog.author.firstName}</div>
                              <div>{blog.createdAt}</div>
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
      ) : (
        <>No blogs available</>
      )}
    </>
  );
};

export default BlogCard;
