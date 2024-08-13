import { toast } from "@/components/ui/use-toast";

export const addBlog = async (formData: FormData) => {
  try {
    const response = await fetch("http://localhost:5000/blog/addBlog", {
      method: "POST",
      credentials: "include",
      body: formData, // Use FormData instead of raw JSON
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
        description: result.message || "An unexpected error occurred. Please try again.",
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
