"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserCircleIcon } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { IErrorState, ProfileType, User, profileSchema } from "@/utils/types";
import { CustomFormField } from "@/components/FormComponents";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const UserProfile = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { user } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();
  // const [updateSession, { data }] = useLazyUpdateSessionQuery();
  // console.log(data);
  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email ?? "",
      newPassword: "",
      oldPassword: "",
      username: user?.username ?? "",
    },
  });
  function onSubmit(values: ProfileType) {
    // console.log(values);
    updateProfile(values);
  }
  useEffect(() => {
    if (user) {
      form.reset({ username: user.username, email: user.email });
    }
  }, [user]);
  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error as IErrorState; // Type assertion
      toast({
        variant: "destructive",
        title: "Error",
        description: errorData.data.message,
      });
    }
  }, [error]);
  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      update();
      toast({ description: "Account updated" });
      router.refresh();
    }
  }, [isSuccess]);
  return (
    <>
      <div className="px-4 sm:px-0 text-center space-y-6 ">
        <h2 className="text-2xl font-semibold leading-7 text-primary">
          Profile
        </h2>
        <UserCircleIcon className="h-14 w-14 text-gray-300 mx-auto" />
        {user ? (
          <Image
            src={user?.userCode}
            height={300}
            width={300}
            alt=""
            className=" mx-auto "
          />
        ) : (
          <Skeleton className="h-48 w-48 rounded-md mx-auto" />
        )}
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Ignore fields you do not wish to change.
        </p>
      </div>

      <Form {...form}>
        {user ? (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <CustomFormField
                    name="username"
                    type="text"
                    control={form.control}
                    placeholder="username"
                  />
                </div>

                <div className="col-span-full">
                  <CustomFormField
                    name="email"
                    type="email"
                    control={form.control}
                    placeholder="email"
                  />
                </div>

                <div className="col-span-full">
                  <CustomFormField
                    name="newPassword"
                    type="password"
                    control={form.control}
                    placeholder="new password"
                  />
                </div>
                <div className="col-span-full">
                  <CustomFormField
                    name="oldPassword"
                    type="password"
                    control={form.control}
                    placeholder="old password"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                disabled={isLoading}
                type="submit"
                className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Update profile
              </button>
            </div>
          </form>
        ) : (
          <Skeleton className=" h-80 w-80 md:h-[500px] md:w-[500px] rounded-md mx-auto" />
        )}
      </Form>
    </>
  );
};

export default UserProfile;
