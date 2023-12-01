"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { ImageIcon, LayoutDashboard, MessageSquare, Music2Icon, SettingsIcon, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
    weight: "600", 
    subsets: ["latin"]
});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    // {
    //     label: "ScanPlus",
    //     icon: MessageSquare,
    //     href: "/a",
    //     color: "text-violet-500"
    // },
    {
        label: "Past Diagnosis",
        icon: ImageIcon,
        href: "/past-diagnosis",
        color: "text-orange-500"
    },
    // {
    //     label: "Want",
    //     icon: VideoIcon,
    //     href: "/c",
    //     color: "text-pink-500"
    // },
    // {
    //     label: "You Got it?",
    //     icon: Music2Icon,
    //     href: "/d",
    //     color: "text-cyan-500"
    // },
    // {
    //     label: "Settings",
    //     icon: SettingsIcon,
    //     href: "/e",
    // },
];

const Sidebar = () => {
    const pathname=usePathname()
    return (
        <div className="space-y-3 py-5 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-5 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-1 mb-14">
                    <div className="relative h-8 w-8 mr-1">
                        <Image
                            fill
                            src="/logo-white.png"
                            alt="Logo" />
                    </div>
                    <h1 className={cn("text-2xl font-bold ml-3", montserrat.className)}>
                        MediMate
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link 
                        href={route.href}
                        key={route.href}
                        className={cn("text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname===route.href ? "text-white bg-white/10" : "text-zince-400")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 ml-1 mr-4",route.color)} />  {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}    

export default Sidebar; 