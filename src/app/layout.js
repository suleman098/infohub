import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Info Hub",
  description: "You Personal New Scrapper",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />

        <AppProvider>
          <div className="flex flex-col items-center min-h-screen">
            <div className="w-1/2 mx-auto flex justify-center items-center">
              <Navbar />
            </div>
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
