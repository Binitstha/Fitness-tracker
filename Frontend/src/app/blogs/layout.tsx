import AddBlog from "@/components/blog/addBlog";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyFitPal",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="m-3 mx-20 ">
      <section className=" my-5 flex justify-end gap-5">
        <AddBlog/>
        <Button>your blogs</Button>
      </section>
      <section>{children}</section>
    </main>
  );
}