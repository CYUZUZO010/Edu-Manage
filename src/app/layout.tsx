import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "School Management System",
  description: "Role-Based dashboard for students, teachers and admins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // shows all types the react can render
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <main className="flex-1">{children}</main>
        <footer className="bg-slate-800 text-white py-4 mt-0">
          <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white text-slate-800 rounded flex items-center justify-center text-sm font-bold">
                SMS
              </div>
            </div>
            <p className="text-sm">© 2025 My App. All rights reserved</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
