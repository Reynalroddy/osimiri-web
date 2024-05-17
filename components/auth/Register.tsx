"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IErrorState, RegisterType, registerSchema } from "@/utils/types";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "../FormComponents";
import Link from "next/link";
// import { useMutation } from "@tanstack/react-query";
// import { registerUser } from "@/lib/api";
import { useToast } from "../ui/use-toast";
import { useRegisterMutation } from "@/redux/api/authApi";
export default function RegisterComponent() {
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const router = useRouter();

  //   const { mutate, isPending } = useMutation({
  //     mutationFn: (values: RegisterType) => registerUser(values),
  //     onError: (error: any) => {
  //       toast({
  //         variant: "destructive",
  //         title: "Error.",
  //         description: error?.response?.data?.message,
  //       });
  //     },
  //     onSuccess: (data) => {
  //       console.log(data);
  //       if (data.data.success === true) {
  //         toast({
  //           description: "Account created",
  //         });
  //         router.push("/auth/login");
  //       }
  //     },
  //   });
  function onSubmit(values: RegisterType) {
    register(values);
  }
  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error as IErrorState; // Type assertion
      toast({
        variant: "destructive",
        title: "Error",
        description: errorData.data.message,
      });
    }

    if (isSuccess) {
      toast({ description: "Account created" });
      router.push("/auth/login");
    }
  }, [error, isSuccess]);

  return (
    <>
      <div className="flex  h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white dark:bg-black mx-3 lg:mx-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
            Register your account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <div className="space-y-4">
                  <div className="mt-2">
                    <CustomFormField
                      name="username"
                      type="text"
                      control={form.control}
                      placeholder="username"
                    />
                  </div>
                  <div className="mt-2">
                    <CustomFormField
                      name="email"
                      type="email"
                      control={form.control}
                      placeholder="email"
                    />
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
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex w-full justify-center rounded-md bg-primary px-3 py-1.5 mt-4  text-sm font-semibold leading-6 text-white shadow-sm ${
                      isLoading ? "bg-primary/30" : ""
                    } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </Form>
          <p className="mt-10 text-center text-sm text-gray-500">
            A member?{" "}
            <Link
              href="/auth/login"
              className="font-semibold leading-6 text-primary"
            >
              login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
