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

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const Signin = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <main
      className={`${roboto.className} flex text-sm justify-center items-center w-full`}
    >
      <div className="w-[28rem] flex flex-col justify-center items-center my-10 ">
        <h1 className=" text-3xl m-6">Reset Password</h1>
        <div className="flex gap-1">
          <p className=" text-stone-400 text-center">
            Forgot your password? No problem. Enter in your email address and
            we&apos;ll send you a link to reset it.
          </p>
        </div>
        <div className="my-10 mb-20 w-80">
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
              <div className="flex justify-center items-center">
                <Button type="submit">Reset password</Button>
              </div>
              <div className="text-center">
                <Link href={"/auth/login"} className="underline">
                  Back to Log In
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Signin;
