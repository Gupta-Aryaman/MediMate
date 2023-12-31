//import './globals.css'
import React from 'react';
import Image from 'next/image';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
export const metadata = {
  title: 'Past Diagnosis',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <div className="h-full relative">
                <div className="hidden h-full md:flex md:w-75 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                    <div>
                        <Sidebar />
                    </div>
                </div>
                <main className="md:pl-72">
                    <Navbar />
                    {children}
                </main>
            </div>
      </body>
    </html>
  )
}