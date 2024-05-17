"use client";
import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BarChart, X } from "lucide-react";
import { ModeToggle } from "./DarkMode";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  setIsAuthenticated,
  setUser,
  setToken,
} from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useSession();
  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.user));
      dispatch(setIsAuthenticated(true));
      dispatch(setToken(data?.accessToken));
    }
  }, [data]);
  const logoutHandler = () => {
    signOut();
  };
  return (
    <Disclosure
      as="nav"
      className="dark:bg-black bg-white sticky top-0 left-0 shadow-md z-[1000]"
    >
      {({ open }) => (
        <>
          <div className=" w-full px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h2 className="font-bold text-primary text-4xl ">GS</h2>
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <a
                    href="#"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white"
                  >
                    Membership
                  </a>
                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-700 hover:text-white"
                  >
                    About Us
                  </a>
                  {data === null && (
                    <Link
                      href="/auth/login"
                      className="rounded-md px-3 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-700 hover:text-white"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  <ModeToggle />
                  {data === undefined && (
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  )}
                  {/* Profile dropdown */}
                  {user && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <Image
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={`
                                ${active} ? "bg-gray-100" : ""
                                block px-4 py-2 text-sm text-gray-700`}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/"
                                onClick={logoutHandler}
                                className={`
                                ${active} ? "bg-gray-100" : "",
                                block px-4 py-2 text-sm text-gray-700
                              `}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>

              <div className="-mr-2 flex sm:hidden">
                <div className="px-3 ">
                  <ModeToggle />
                </div>
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BarChart className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              >
                Membership
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-black dark:text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                About Us
              </Disclosure.Button>
              {data === null && (
                <Disclosure.Button
                  as="a"
                  href="/auth/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-black dark:text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Login
                </Disclosure.Button>
              )}
            </div>
            {data === undefined && (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            )}
            {user && (
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user?.username}
                    </div>
                    <div className="text-sm font-medium text-black dark:text-gray-300">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-black dark:text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Your Profile
                  </Disclosure.Button>

                  <Disclosure.Button
                    onClick={logoutHandler}
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-black dark:text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
