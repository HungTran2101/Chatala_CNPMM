import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalProvider } from "../src/contexts/globalContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Head>
        <title>Chatala</title>
      </Head>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
