import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import type { NextComponentType } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalState } from "../context/state";
import AlertModal from "@/components/AlertModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // @ts-ignore
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 300000, // 5mins
    },
  },
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

//Add custom appProp type then use union to add it
type CustomAppProps = MyAppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

export default function MyApp(props: CustomAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <GlobalState>
              {Component.auth ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
              <AlertModal/>
            </GlobalState>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

function Auth({ children }: any) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const hasUser = !!session?.user;

  React.useEffect(() => {
    if (!loading && !hasUser) {
      signIn();
    }
  }, [loading, hasUser]);
  if (loading || !hasUser) {
    return <div>Waiting for session...</div>;
  }
  return children;
}
