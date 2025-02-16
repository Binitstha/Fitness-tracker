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
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import { useSession } from "@/context/authContext";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Please enter your password" })
    .max(50, { message: "Password must not exceed 50 characters" }),
});

const Login = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, fetchUserDetails } = useSession();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const Url = process.env.NEXT_PUBLIC_API;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(`${Url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensures cookies are sent with request
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setIsAuthenticated(false);
        toast({
          title: "Login failed",
          description: result.message,
          variant: "destructive",
        });
      } else {
        setIsAuthenticated(true);
        toast({
          title: "Login successful",
          description: result.message,
          variant: "default",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      fetchUserDetails()
      setLoading(false);
    }
  };

  return (
    <main
      className={`${roboto.className} flex text-sm justify-center items-center w-full h-screen`}
    >
      <div className="w-[28rem] flex flex-col justify-center items-center my-10">
        <h1 className="text-3xl m-6">Log In</h1>
        <div className="flex gap-1">
          <p className="text-stone-400">Don&apos;t have an account?</p>
          <Link href="/auth/signup" className="underline">
            Sign Up
          </Link>
        </div>
        <div className="my-10 mb-20 w-96">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <div className="text-center">
                <Link href={"/auth/forgotPassword"} className="underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="flex justify-center items-center">
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader /> : "Log In"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Login;
