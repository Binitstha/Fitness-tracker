"use client";

import { z } from "zod";
import { roboto } from "@/app/fonts";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

const FormSchema = z.object({
  weight: z
    .string()
    .min(1, { message: "Weight must be at least 1 characters" })
    .max(10, { message: "Weight must not exceed 10 characters" }),
  heightFT: z
    .string()
    .min(1, { message: "Height must be at least 1 characters" })
    .max(10, { message: "Height must not exceed 10 characters" }),
  heightIN: z
    .string()
    .min(1, { message: "Height must be at least 1 characters" })
    .max(10, { message: "Height must not exceed 10 characters" }),
  city: z.string(),
  profileImage: z.any().optional(),
});

const Personalize = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      weight: "",
      heightFT: "",
      heightIN: "",
      city: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const Url = process.env.NEXT_PUBLIC_API;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const { weight, city, profileImage, heightFT, heightIN } = data;
    const formData = new FormData();
    formData.append("city", city);
    formData.append("profileImage", profileImage);
    formData.append("height", `${heightFT}'${heightIN}"`);
    formData.append("weight", `${weight}kg`);

    console.log(formData);
    try {
      const response = await fetch(`${Url}/account/personalize`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        toast({
          title: "Error not found",
          description: result.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to update the personal detail",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      router.push("/dashboard");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      form.setValue("profileImage", file);
    }
  };

  return (
    <main
      className={`${roboto.className} flex text-sm justify-center items-center w-full`}
    >
      <div className="w-[28rem] flex flex-col justify-center items-center my-10 ">
        <h1 className="text-3xl m-6">Personalize Profile</h1>
        <div className="my-7 mb-20 w-96">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-center items-center gap-2 text-center">
                    <FormControl className="relative">
                      <label className="relative w-24 h-24 cursor-pointer">
                        <input
                          className="rounded-full h-24 w-24 opacity-0 absolute inset-0 cursor-pointer"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          disabled={loading}
                        />
                        <div
                          className={clsx(
                            !imagePreview ? "border border-dashed" : "",
                            "absolute inset-0 flex items-center justify-center rounded-full  border-gray-300",
                          )}
                        >
                          {imagePreview ? (
                            <Image
                              src={imagePreview}
                              height={100}
                              width={100}
                              alt="Profile Preview"
                              className="rounded-full h-24 w-24"
                            />
                          ) : (
                            <span className="text-gray-500">
                              <Camera />
                            </span>
                          )}
                        </div>
                      </label>
                    </FormControl>
                    <FormLabel className="text-xs">
                      Add your profile image
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="Enter Weight"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 justify-between">
                <FormField
                  control={form.control}
                  name="heightFT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (ft)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Enter Height (ft)"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heightIN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (in)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Enter Height (in)"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter City"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3 justify-center items-center">
                <Link href={"/dashboard"}>
                  <Button className="w-28">Skip for now</Button>
                </Link>
                <Button className="w-28" type="submit" disabled={loading}>
                  {loading ? <Loader /> : "Done"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Personalize;
