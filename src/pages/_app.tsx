import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "~/components/layout/AppLayout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default api.withTRPC(MyApp);
