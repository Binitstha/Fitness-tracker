import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLatestBlogPost } from "@/api/blog/blog";
import { blogType } from "@/types/types";
import { useEffect, useState } from "react";
import Link from "next/link";

const BlogsSection = () => {
  const [blogsData, setBlogData] = useState<blogType[]>();

  useEffect(() => {
    const fetch = async () => {
      const data = await getLatestBlogPost();
      setBlogData(data);
    };

    fetch();
  }, []);

  return (
    <>
      {blogsData &&
        blogsData.length > 0 &&
        blogsData.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <CardContent className="p-0">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_LOCATION}blog/${post.image}`}
                  alt={post.title as string}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-4">
                    {post.content}
                  </p>
                  <Link href={`/blogs/${post.id}`}>
                    <Button variant="outline" className="self-start">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
    </>
  );
};

export default BlogsSection;
