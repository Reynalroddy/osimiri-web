"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";



import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import AuthProvider from "@/components/AuthProvider";


function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000 * 5,
        },
      },
    });
  });

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        {/* <QueryClientProvider client={queryClient}> */}
          {children}
          {/* <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider> */}
      </ThemeProvider>
    </>
  );
}
export default Providers;
