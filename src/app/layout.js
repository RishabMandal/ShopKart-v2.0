import GlobalState from "@/context";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
// import ChatBot from "@/components/ChatBot/ChatBot";
// import ChatBot from "@/components/ChatBotv2/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopKart",
  description: "Try shopping with me!!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main>{children}</main>
          {/* <ChatBot /> */}
          <Footer />
        </GlobalState>
      </body>
    </html>
  );
}
