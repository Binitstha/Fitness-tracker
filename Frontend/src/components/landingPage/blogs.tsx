"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    title: "10 Tips for Staying Motivated on Your Fitness Journey",
    excerpt: "Discover practical strategies to keep your motivation high and achieve your fitness goals.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "The Science Behind High-Intensity Interval Training (HIIT)",
    excerpt: "Learn why HIIT is so effective and how to incorporate it into your workout routine.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Nutrition Myths Debunked: Separating Fact from Fiction",
    excerpt:
      "We tackle common nutrition myths and provide evidence-based information to help you make informed choices.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const BlogHighlights = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">From Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardContent className="p-0">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                    <Button variant="outline" className="self-start">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogHighlights

