"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { blogType } from "@/types/types";
import { addBlog } from "@/api/blog/blog";

// Define the schema for validation
const formSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  content: z.string().min(1, "Content cannot be empty."),
  category: z.string().min(1, "Please select a category."),
  tags: z.string().optional(),
  image: z.any().optional(),
});

const AddBlog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      tags: "",
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    if (data.tags) {
      formData.append("tags", data.tags);
    }
    if (data.image) {
      formData.append("image", data.image);
    }
    try {
      const newBlog = await addBlog(formData);
      setIsOpen(false); // Close the dialog on successful submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            form.reset();
            setIsOpen(true);
          }}
        >
          Add Blog Post
        </Button>
      </DialogTrigger>
      <DialogContent className=" mx-auto">
        <DialogHeader>
          <DialogTitle>Add a New Fitness Blog Post</DialogTitle>
          <DialogDescription>
            Share your latest fitness workout or tips with your readers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Enter blog title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="tags">Tags</FormLabel>
                    <FormControl>
                      <Input
                        id="tags"
                        className="w-72"
                        placeholder="Enter tags (e.g., strength, cardio)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-40">
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange({ target: { value } })
                        }
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Workout">Workout</SelectItem>
                          <SelectItem value="Nutrition">Nutrition</SelectItem>
                          <SelectItem value="Wellness">Wellness</SelectItem>
                          <SelectItem value="Fitness Tips">
                            Fitness Tips
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <FormControl>
                    <textarea
                      id="content"
                      className="h-40 min-h-40 max-h-56 w-full p-2 text-start resize-y overflow-auto bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="Describe the workout or tips"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="image">Upload Image</FormLabel>
                  <FormControl>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload an image that represents your blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end">
              <Button type="submit">Add Blog</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlog;
