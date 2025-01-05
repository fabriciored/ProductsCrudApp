import "@/styles/globals.css";
import Template from "@/template";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Template>
    <Component {...pageProps} />
    <ToastContainer />
    </Template>
  )
}
