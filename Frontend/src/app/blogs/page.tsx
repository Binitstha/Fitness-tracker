import FeaturedBlogs from "@/components/blog/featuredBlog";
import LatestBlogs from "@/components/blog/latestBlogs";

const Page = () => {
  return (
    <>
      <main className="m-10 my-5 flex flex-col justify-center items-center">
        <FeaturedBlogs />
        <LatestBlogs />
      </main>
    </>
  );
};

export default Page;
