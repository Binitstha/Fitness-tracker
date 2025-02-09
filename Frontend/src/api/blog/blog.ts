import { toast } from "@/components/ui/use-toast";
import { blogType } from "@/types/types";
import { requirePropFactory } from "@mui/material";

const Url = process.env.NEXT_PUBLIC_API;

export const addBlog = async (formData: FormData) => {
  try {
    const response = await fetch(`${Url}/blog/addBlog`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const result = await response.json();

    console.log(result);

    if (response.ok) {
      toast({
        title: "Blog added",
        description: "Your blog has been successfully added.",
        variant: "default",
      });
      return result.data;
    } else {
      toast({
        title: "Failed to add blog",
        description:
          result.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to add blog",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

export const getLatestBlogPost = async () => {
  try {
    const response = await fetch(`${Url}/blog/getLatestBlogPost/`, {
      method: "GET",
    });

    const data = await response.json();
    return data.data;
  } catch (e) {
    toast({
      description: "Failed to fetch latest blogs",
      variant: "destructive",
    });

    console.log(e);
    return [];
  }
};

export const getSingleBlog = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`${Url}/blog/getSingleBlog/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data.data;
  } catch (e) {
    console.log(e);
  }
};

export const getFeaturedBlogs = async () => {
  try {
    const response = await fetch(`${Url}/blog/getFeaturedBlogPost/`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    return data.data;
  } catch (e) {
    console.log(e);
  }
};

export const postComment = async ({
  postId,
  comment,
}: {
  postId: string;
  comment: string;
}) => {
  try {
    const commentData = {
      postId: postId,
      comment: comment,
    };

    const response = await fetch(`${Url}/blog/postComment`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(commentData),
    });

    const data = await response.json();

    return data.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteBlog = async ({ id }: { id: string }) => {
  try {
    await fetch(`${Url}/blog/deleteBlog/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    toast({
      title: "Blog Deleted",
      description: "Your blog has been successfully deleted.",
      variant: "destructive",
    });
    return id;
  } catch (e) {
    console.log(e);
  }
};

export const getUserBlogs = async () => {
  try {
    const response = await fetch(`${Url}/blog/getUserBlogs`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    return data.data;
  } catch (e) {
    console.log(e);
  }
};
