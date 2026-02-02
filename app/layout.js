import "@/app/_styles/globals.css";
import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { RevervationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body
        className={`${josefin.className} antialiased min-h-screen bg-primary-950 text-primary-100 flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto h-full w-full">
            <RevervationProvider>{children}</RevervationProvider>
          </main>
        </div>
        <footer className="border-t-2 p-2">Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
