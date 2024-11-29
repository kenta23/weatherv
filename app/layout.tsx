import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/clientProvider/queryclient";
import HydrateQueryClient from "@/clientProvider/hydration";
import BackgroundProvider from "@/clientProvider/provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeatherV",
  description: "A realtime weather forecast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <HydrateQueryClient>
             <BackgroundProvider>{children}</BackgroundProvider>
          </HydrateQueryClient>
        </Providers>
      </body>
    </html>
  );
}
