import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white m-0 p-0">
        <Header />
        <div className="flex"> 
          <Sidebar />
          {/* pt-[105px] is the distance from the top of the screen to the yellow line.
              We remove all other paddings and margins. */}
          <main className="flex-1 ml-64 pt-[0px] min-h-screen bg-white m-0 p-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}