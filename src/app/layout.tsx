import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./_providers/redux-provider/redux-provider";

export const metadata: Metadata = {
  title: "superdm-assingment",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex items-center justify-center h-screen w-screen bg-[url(/images/bg.jpg)]`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}