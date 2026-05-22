import type { Metadata } from "next";
import MotionProvider from "./motion-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shubham Deshmukh | Full Stack Engineer · Agentic AI Developer · Cybersecurity Engineer",
  description:
    "Cinematic founder-style portfolio of Shubham Deshmukh featuring full stack engineering, agentic AI development, and cybersecurity projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased allow-motion">
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
