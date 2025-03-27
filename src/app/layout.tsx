"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./theam-toggl";
import "./globals.css";
import Image from "next/image";
import { Provider } from "react-redux";
import { store } from "../Store/Store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    router.push("/login");
  };

  return (
    <html suppressHydrationWarning>
      <body>
        <Provider store={store}>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <div className="flex min-h-screen ">
              <div className="fixed z-[9999] h-screen p-8 w-[250px] text-white bg-black flex flex-col justify-center items-center">
                <div className="mb-8 ">
                  <h2 className="text-4xl font-bold ">Dashboard</h2>
                </div>
                <nav className="space-y-2">
                  <a
                    href="#"
                    className="block py-2 px-20 hover:bg-gray-700 rounded text-2xl font-bold"
                  >
                    Settings
                  </a>
                  <a
                    href="/dashboard"
                    className="block py-2 px-20 hover:bg-gray-700 rounded text-2xl font-bold"
                  >
                    Profile
                  </a>
                  <button
                    onClick={() => {
                      handleLogout();
                      router.push("/");
                    }}
                    className="bg-red-500 text-white px-14 py-2 rounded hover:bg-red-600 text-3xl ml-3.5"
                  >
                    Logout
                  </button>
                </nav>
              </div>

              <div className="flex-1 ">
                <header className="bg-slate-800 text-white shadow-sm p-4 flex justify-between items-center w-full sm:pl-[30%] pl-[50%]">
                  <Image
                    src="https://thumbs.dreamstime.com/b/tree-roots-logo-tree-roots-logo-tree-leaves-roots-logo-icon-338359273.jpg"
                    alt="Algo-root"
                    height={120}
                    width={120}
                    className="rounded-full"
                  />

                  {/* <Button>Button1</Button>
                <Button variant="secondary">Button2</Button> */}

                  <ThemeToggle />
                </header>
                <main className="p-4">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
