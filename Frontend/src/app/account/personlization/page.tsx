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
const FormSchema = z.object({
  weight: z
    .string()
    .min(2, { message: "Weight must be at least 2 characters" })
    .max(50, { message: "Weight must not exceed 50 characters" }),
  heightFT: z
    .string()
    .min(2, { message: "Height must be at least 2 characters" })
    .max(50, { message: "Height must not exceed 50 characters" }),
  heightIN: z
    .string()
    .min(2, { message: "Height must be at least 2 characters" })
    .max(50, { message: "Height must not exceed 50 characters" }),
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
      profileImage: "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data)
    // setLoading(true);
    // try {
    //   const formData = new FormData();
    //   formData.append("weight", data.weight);
    //   formData.append("height", data.height);
    //   formData.append("city", data.city);
    //   if (data.profileImage) {
    //     formData.append("profileImage", data.profileImage[0]);
    //   }

    //   const response = await fetch("http://localhost:5000/auth/register", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     toast({
    //       title: "Registration successful",
    //       description:
    //         "You have successfully registered. Redirecting to login...",
    //       variant: "default",
    //     });

    //     setTimeout(() => {
    //       router.push("/auth/login");
    //     }, 3000);
    //   } else {
    //     toast({
    //       title: "Registration failed",
    //       description:
    //         "There was an error registering your account. Please try again.",
    //       variant: "destructive",
    //     });
    //     throw new Error("Failed to register user");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast({
    //     title: "Failed to register user",
    //     description: "An unexpected error occurred. Please try again.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <main
      className={`${roboto.className} flex text-sm justify-center items-center w-full`}
    >
      <div className="w-[28rem] flex flex-col justify-center items-center my-10 ">
        <h1 className=" text-3xl m-6">Personalize Profile</h1>
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
                          {...field}
                          onChange={(e) => {
                            handleImageChange(e);
                            field.onChange(e.target.files);
                          }}
                          disabled={loading}
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-full border border-dashed border-gray-300">
                          {selectedImage ? (
                            <Image
                              src={selectedImage}
                              height={100}
                              alt="Profile"
                              className="w-full h-full object-cover rounded-full"
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
                    <FormLabel>Weight kg</FormLabel>
                    <FormControl>
                      <Input
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
                <Link href={"/"}>
                  <Button className=" w-28">Skip for now</Button>
                </Link>
                <Button className=" w-28" type="submit" disabled={loading}>
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
