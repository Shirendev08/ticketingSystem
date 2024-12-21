// components/MyForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { login } from "@/lib/services";
// Define schema for validation
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password must be at least 6 characters.",
  }),
});

const MyForm: React.FC = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: { username: string; password: string }) => {
    try {
      // Use the login function from auth.ts
      await login(data.username, data.password);
      // Redirect to the home page on successful login
      router.push("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center py-10">
      <div className="flex flex-col items-center gap-10 w-full max-w-[420px]">
        <header className="header flex flex-col  justify-start gap-5 md:gap-8 ">
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image src="/purpleback.jpg" width={34} height={34} alt="logo" />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Sign In</h1>
          </Link>
        </header>
        <div className="w-full flex flex-col gap-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-14 font-medium">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className="text-16 placeholder:text-16 rounded-lg border border-gray-300 placeholder:text-gray-500"
                      />
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
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="text-16 placeholder:text-16 rounded-lg border border-gray-300 placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
    
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
               Don&apos;t have an account?  
            </p>
            <Link href='/sign-up' className="form-link">
              Sign Up
            </Link>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default MyForm;
