"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { UserCircleIcon } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  IErrorState,
  PlanStatus,
  ProfileType,
  SubType,
  User,
  profileSchema,
  subSchema,
} from "@/utils/types";
import CustomFormSelect, { CustomFormField } from "@/components/FormComponents";
import {
  useCheckSubMutation,
  useMakePaymentMutation,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CustomBtn from "../CustomBtn";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DialogDemo from "../SubscriptionModal";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { getVal } from "@/lib/api";
import QrReader from "./Cam";

const UserProfile = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [data, setData] = useState("Capture : ...");
  const [show, setShow] = useState(false);
  const qrRef = useRef(null);
  const { user } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();
  const [
    checkSub,
    {
      isLoading: checkLoad,
      isSuccess: checkSuccess,
      error: checkError,
      data: checkData,
    },
  ] = useCheckSubMutation();

  const [
    makePayment,
    {
      isLoading: paymentLoading,
      isSuccess: paymentSuccess,
      error: paymentErroor,
      data: paymentData,
    },
  ] = useMakePaymentMutation();
  // const [updateSession, { data }] = useLazyUpdateSessionQuery();
  console.log(user);
  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email ?? "",
      newPassword: "",
      oldPassword: "",
      username: user?.username ?? "",
    },
  });
  const subform = useForm<SubType>({
    resolver: zodResolver(subSchema),
    defaultValues: {
      plan: PlanStatus.Monthly,
    },
  });
  function onSubmit(values: ProfileType) {
    // console.log(values);
    updateProfile(values);
  }

  function onSubmitSub(values: SubType) {
    const orderref = `sub-` + new Date().getTime().toString();
    const totalP = getVal(values.plan, "Single");
    const data = {
      reference: orderref,
      email: user.email,
      amount: totalP * 100,
      subType: values.plan,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/profile`,
    };
    // console.log(orderref, totalP, user.email);
    // updateProfile(values);
    makePayment(data);
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
  useEffect(() => {
    if (paymentSuccess) {
      // console.log(paymentData);
      router.replace(paymentData.data.data.authorization_url);
    }
  }, [paymentSuccess]);
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
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {user?.isActiveSub
            ? "Subscription Active."
            : "No active subscription"}
        </p>
        {user?.isActiveSub ? (
          ""
        ) : (
          <DialogDemo triggerText="Subscribe">
            <Form {...subform}>
              <form onSubmit={subform.handleSubmit(onSubmitSub)}>
                <DialogHeader>
                  <DialogTitle>Plan Subscription</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <CustomFormSelect
                    name="plan"
                    control={subform.control}
                    labelText="plan"
                    items={Object.keys(PlanStatus).map((item: any) => {
                      return {
                        label: item,
                        value: (PlanStatus as any)[item],
                      };
                    })}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Subscribe</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogDemo>
          // <Dialog>
          //   <DialogTrigger asChild>
          //     <Button className="btn-primary">Subscribe</Button>
          //   </DialogTrigger>
          //   <DialogContent className="sm:max-w-[425px]">
          //     <DialogHeader>
          //       <DialogTitle>Plan Subscription</DialogTitle>
          //     </DialogHeader>
          //     <div className="grid gap-4 py-4">
          //       <div className="grid grid-cols-1 items-center gap-4">
          //         <Label htmlFor="name" className="text-right">
          //           Name
          //         </Label>
          //         <Input
          //           id="name"
          //           defaultValue="Pedro Duarte"
          //           className="col-span-3"
          //         />
          //       </div>
          //       <div className="grid grid-cols-4 items-center gap-4">
          //         <Label htmlFor="username" className="text-right">
          //           Username
          //         </Label>
          //         <Input
          //           id="username"
          //           defaultValue="@peduarte"
          //           className="col-span-3"
          //         />
          //       </div>
          //     </div>
          //     <DialogFooter>
          //       <Button type="submit">Subscribe</Button>
          //     </DialogFooter>
          //   </DialogContent>
          // </Dialog>
        )}
        {user?.role === "admin" && (
          <>
            <Button
              className="btn-primary block mx-auto"
              onClick={() => setShow(!show)}
            >
              {" "}
              {show ? "Close" : "Open"} QR Scanner
            </Button>
            {show && <QrReader setShow={setShow} />}
          </>
        )}
        {user?.role === "admin" && (
          <Button
            className="btn-primary block mx-auto"
            onClick={() => router.push("/admin")}
          >
            {" "}
            View Users
          </Button>
        )}
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
