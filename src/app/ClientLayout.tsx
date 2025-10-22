"use client";

import "./globals.css";
import { type ReactNode, useEffect, useState } from "react";
import Link from "next/link";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [year, setYear] = useState<number | null>(null);
  //the year maybe the number or null we start by assigning it to null.
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-500">
        <nav className="bg-blue-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              My App
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="./signup" className="hover:underline">
                Sign Up
              </Link>
              <Link href="./login" className="hover:underline">
                Log In
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>

        {/*The footer is here.*/}

        <footer className="bg-blue-600 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; {year ?? "----"} My App. All rights reserved</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
