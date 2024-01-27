import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata = {
  title: "GLGroup - start your business in Indonesia",
  description: "Good Luck Group start your business in Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'bg-white')}>{children}</body>
    </html>
  );
}
