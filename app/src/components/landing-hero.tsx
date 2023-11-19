"use client"
import { useAuth } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { Button } from "./ui/button";

export const LandingHero = () => { 
    const {isSignedIn } = useAuth();
    return (
        <div className="text-black font-bold text-center py-36 space-y-5">
            <div className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl space-y-5 font-extrabold">
                Your Diagnosis Now At Your Fingertips 
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-rose-100 to-teal-100 p-2">
                <TypewriterComponent 
                    options={{
                        strings: ['Diagnose Yourself Within Moments', 'Get A Treatment Plan'],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>                
            </div>
            <div className="text-sm md:text-xl font-light text-white">
                <p>An AI application to diagnose patients and provide treatment plans.</p>
            </div>
            <div className="flex justify-center">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button className="rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 md:text-lg p-4 md:p-6 font-semibold">
                    {isSignedIn ? "Go to Dashboard" : "Get Your Diagnosis Now"}
                    </Button>
                </Link>
            </div>
            <div className="text-white text-xs md:text-sm font-normal py-2">
                No Credit Card Required 
            </div>
        </div>
    )
}