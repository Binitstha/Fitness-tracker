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
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries from "@/lib/country";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "first name must be at least 2 characters" })
    .max(50, { message: "first name must not exceed 50 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "first name must not exceed 50 characters" }),
  email: z.string().email({ message: "invalid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" })
    .max(50),
  dateOfBirth: z.date({ required_error: "Invalid date of birth" }),
  gender: z.string({ required_error: "Gender is required" }),
  country: z.string({ required_error: "Country is required" }),
});

const Signin = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Registration successful",
          description: "You have successfully registered. Redirecting to login...",
          variant: "default",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        toast({
          title: "Registration failed",
          description: "There was an error registering your account. Please try again.",
          variant: "destructive",
        });
        throw new Error("Failed to register user");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to register user",
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
      <div className="w-[28rem] flex flex-col justify-center items-center my-10 ">
        <h1 className=" text-3xl m-6">Welcome to MyFitPal</h1>
        <div className="flex gap-1">
          <p className=" text-stone-400">Already a member?</p>
          <Link href="/auth/login" className="underline">
            Log In
          </Link>
        </div>
        <div className="my-10 mb-20 w-96">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter First Name" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Last Name" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} disabled={loading} />
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
                          disabled={loading}
                        />
                        <div className="absolute right-3 top-2">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={loading}
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <div className="">
                      <Input
                        placeholder="mm/dd/yyyy"
                        type="date"
                        min="1900-01-01"
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          field.onChange(selectedDate);
                        }}
                        disabled={loading}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country, index) => (
                          <SelectItem value={country} key={index}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Sign up"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Signin;
