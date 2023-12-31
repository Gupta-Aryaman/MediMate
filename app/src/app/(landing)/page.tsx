import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";

const LandingPage = () => {
  return (
    <div className='h-full'>
      <LandingNavbar />
      <LandingHero />

    </div>
  );
}

export default LandingPage;










// import { Button } from "@/components/ui/button";
// import { SignUp, UserButton, auth } from "@clerk/nextjs";
// import Link from "next/link";
// import { LogIn } from 'lucide-react';

// export default async function Page() {
//   const { userId } = await auth();
//   const isAuth = !!userId;

//   return (
//     <div className='w-screen min-h-screen text-white'>
//       <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
//         <div className='flex flex-col items-center text-center'> 
//           <div className='flex items-center'>
//             <h1 className="mr-3 text-6xl font-semibold font-sans text-black">Hello There!</h1>
//           </div>
//           <p className="max-w-xl mt-4 text-lg text-black font-semibold">Diagnose Yourself within Moments and get a Treatment Plan</p>
//           <UserButton afterSignOutUrl="/" />
//           <div className="w-full mt-4">
//             {isAuth ? (
//               <Link href="/dashboard">
//                 <Button>Go to Dashboard</Button>
//               </Link>
//             ) : (
//               <Link href="/sign-in">
//                 <Button>Sign In<LogIn className="w-4 h-4 ml-2" /></Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
