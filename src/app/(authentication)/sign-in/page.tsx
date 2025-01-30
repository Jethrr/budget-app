"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
});

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Login successfull",
            });
            router.push("/dashboard");
            router.refresh();
          },
          onError: (ctx) => {
            setLoading(false);
            toast({
              title: "Error",
              description: "Login unsuccessfull. Try again!",
            });
          },
        }
      );
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <div className="main h-screen w-full flex items-center justify-center">
      <div className="container">
        <div className="heading-text justify-center text-center">
          <h1 className="text-4xl font-bold">Sign In</h1>
          <p className="text-lg text-gray-500">Login to your account now.</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-6xl mx-auto p-10 w-4/12"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndeo@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Use correct email for verification.
                  </FormDescription>
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
                    <PasswordInput placeholder="*********" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" variant="default" type="submit">
              {loading ? <MoonLoader color="#000000" size={20} /> : "Login"}
            </Button>
          </form>
        </Form>

        <div className="footer">
          <p className="text-center text-gray-400">
            Dont have an account yet?{" "}
            <Link
              href="/sign-up"
              className={buttonVariants({ variant: "link" })}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
