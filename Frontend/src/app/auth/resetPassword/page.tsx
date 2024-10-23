"use client";

import { z } from "zod";
import { roboto } from "@/app/fonts";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/ui/loader";
import { dividerClasses } from "@mui/material";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Please enter your password" })
      .max(50, { message: "Password must not exceed 50 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" })
      .max(50, { message: "Password must not exceed 50 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const Url = process.env.NEXT_PUBLIC_API;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(`${Url}/auth/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, token }),
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Password reset successful",
          description: result.message,
          variant: "default",
        });

        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        toast({
          title: "Password reset failed",
          description: result.message,
          variant: "destructive",
        });
        throw new Error("Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to reset password",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`${roboto.className} flex text-sm justify-center items-center w-full`}
    >
      {token ? (
        <div className="w-[28rem] flex flex-col justify-center items-center my-10 ">
          <h1 className="text-3xl m-6">Reset Password</h1>
          <div className="my-10 mb-20 w-96">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl className="relative">
                        <div>
                          <Input
                            placeholder="Enter password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <div className="absolute right-3 top-2">
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Eye className="h-5 w-5 text-gray-400" />
                              ) : (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl className="relative">
                        <div>
                          <Input
                            placeholder="Enter password"
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                          />
                          <div className="absolute right-3 top-2">
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <Eye className="h-5 w-5 text-gray-400" />
                              ) : (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center">
                  <Link href={"/auth/forgotPassword"} className="underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="flex justify-center items-center">
                  <Button type="submit" disabled={loading}>
                    {loading ? <Loader /> : "Reset Password"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">Token is missing</div>
      )}
    </main>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
};

export default Page;
