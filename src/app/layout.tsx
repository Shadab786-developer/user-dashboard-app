"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./theam-toggl";
import { Button } from "@/components/ui/button";
import "./globals.css";

const Sidebar = styled.aside`
  @apply text-white p-4 fixed h-full;
  width: 250px;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  background: #1f2937;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <div className="flex min-h-screen">
            <Sidebar>
              <div className="mb-8">
                <h2 className="text-4xl font-bold ">Dashboard</h2>
              </div>
              <nav className="space-y-2">
                <a className="block p-2 hover:bg-gray-700 rounded text-2xl">
                  Dashboard
                </a>
                <a className="block p-2 hover:bg-gray-700 rounded text-2xl">
                  Settings
                </a>
                <a className="block p-2 hover:bg-gray-700 rounded text-2xl">
                  Profile
                </a>
              </nav>
            </Sidebar>

            <div className="flex-1 ">
              <header className="bg-slate-800 text-white shadow-sm p-4 flex justify-between items-center">
                <div className="font-extrabold text-3xl pl-5">Welcome User</div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
                {/* <Button>Button1</Button>
                <Button variant="secondary">Button2</Button> */}

                <ThemeToggle />
              </header>
              <main className="p-4">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
