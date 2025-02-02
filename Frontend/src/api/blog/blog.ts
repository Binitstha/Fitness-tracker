import { toast } from "@/components/ui/use-toast";
import { blogType } from "@/types/types";

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

export const getGetLatestBlogs = async (): Promise<blogType[]> => {
  try {
    const response = await fetch(`${Url}/blog/getGetLatestBlogs`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    console.log(data)
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
