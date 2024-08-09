"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

// Define the schema for validation
const formSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  content: z.string().min(1, "Content cannot be empty."),
  category: z.string().min(1, "Please select a category."),
  tags: z.string().optional(),
  image: z.any().optional(),
});

const AddBlog = () => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null,
  );
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Blog Post</Button>
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
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <FormControl>
                    <Input
                      id="content"
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
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="tags">Tags</FormLabel>
                  <FormControl>
                    <Input
                      id="tags"
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
                <FormItem>
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
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="image">Upload Image</FormLabel>
                  <FormControl>
                    <Input id="image" type="file" accept="image/*" {...field} />
                  </FormControl>
                  <FormDescription>
                    Upload an image that represents your blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlog;
