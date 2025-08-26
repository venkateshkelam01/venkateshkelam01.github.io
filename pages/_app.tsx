import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/lib/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider storageKey="portfolio-theme">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
