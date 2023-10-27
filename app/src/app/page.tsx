import { Button } from "@/components/ui/button";
import { SignUp, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import {LogIn} from 'lucide-react'

export default async function Page() {
  const {userId} = await auth()
  const isAuth =  !!userId

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='flex flex-col items-center text-center'> 
          <div className='flex items-center'>
          <h1 className="mr-3 text-6xl font-semibold">Hello There!</h1>
          </div>
          <p className="max-w-xl mt-4 text-lg text-black-600 font-semibold">Diagnose Yourself within Moments and get a Treatment Plan</p>
          <UserButton afterSignOutUrl="/" />
          <div className="w-full mt-4">
            {isAuth ? (<h1> Go to Dashboard </h1>) :
            (<Link href="/sign-in">
              <Button >Sign In<LogIn className="w-4 h-4 ml-2" /></Button></Link>)} 
          </div>

        </div>
      </div>
    </div>
  )
}
