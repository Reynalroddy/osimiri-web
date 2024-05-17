"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginType, loginSchema } from "@/utils/types";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "../FormComponents";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
export default function LoginComponent() {
  // 1. Define your form.
  const { toast } = useToast();
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [err, setErr] = useState("");

  async function onSubmit(values: LoginType) {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    console.log(res);
    if (res?.url) {
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "invalid credentials",
      });
    }
  }

  return (
    <>
      <div className="flex  h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white dark:bg-black mx-3 lg:mx-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <div className="space-y-6">
                  {/* <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label> */}
                  <div className="mt-2">
                    <CustomFormField
                      name="email"
                      type="email"
                      control={form.control}
                      placeholder="email"
                    />
                    {/* <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-dark dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /> */}
                  </div>
                </div>

                <div>
                  {/* <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label> */}
                  <div className="mt-2">
                    <CustomFormField
                      name="password"
                      type="password"
                      control={form.control}
                      placeholder="password"
                    />
                    {/* <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={(e) => setPwd(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-dark dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /> */}
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-primary">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>
          </Form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/auth/register"
              className="font-semibold leading-6 text-primary"
            >
              register
            </Link>
          </p>
          {err && <p className="text-red-500">{err}</p>}
        </div>
      </div>
    </>
  );
}
