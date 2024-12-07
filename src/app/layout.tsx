import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Task mate",
  description: "Task mate",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en" className={`${GeistSans.variable} fixed inset-0`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
