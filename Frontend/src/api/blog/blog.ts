import { toast } from "@/components/ui/use-toast";
import { blogType } from "@/types/types";

export const addBlog = async (data: blogType) => {
  try {
    const response = await fetch("http://localhost:5000/blog/addBlog", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      toast({
        title: "Goal added",
        description: "Your goal has been successfully added.",
        variant: "default",
      });
      return result.data;
    } else {
      toast({
        title: "Failed to add goal",
        description:
          result.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to add goal",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};
