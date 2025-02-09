import BlogsSection from "../ui/blogSection";

const BlogHighlights = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          From Our Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BlogsSection />
        </div>
      </div>
    </section>
  );
};
export default BlogHighlights;
