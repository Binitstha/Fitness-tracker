"use client";
import { useState } from "react";
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
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const ForgotPassword = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/auth/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        toast({
          title: "Error not found",
          description: result.message,
          variant: "destructive",
        });
      } else {
        setFormSubmitted(true);
      }
    } catch (error) {
      setFormSubmitted(false);
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
        <h1 className=" text-3xl m-6">Reset Password</h1>
        {!formSubmitted ? (
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-1">
              <p className=" text-stone-400 text-center">
                Forgot your password? No problem. Enter in your email address
                and we&apos;ll send you a link to reset it.
              </p>
            </div>
            <div className="my-10 mb-20 w-96">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Email"
                            {...field}
                            disabled={formSubmitted}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center items-center">
                    <Button type="submit" disabled={loading}>
                      {loading ? <Loader /> : "Reset password"}
                    </Button>
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
        ) : (
          <div className="flex flex-col gap-4">
            <p>
              An email with a link to reset your <b>MyFitPal</b> account
              password has been sent to your email.
            </p>
            <p>
              If you do not receive an email from us in the next few minutes,
              please make sure you entered your address correctly and check your
              junk mail folder.
            </p>
            <div className="text-center">
              <Link href={"/auth/login"} className="underline">
                Back to Log In
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
