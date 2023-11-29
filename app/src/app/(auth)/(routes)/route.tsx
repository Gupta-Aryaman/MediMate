import { NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs";
 
export async function GET(request: Request) {
  const { stripeId, userId } = await request.body.json();
 
  const user = await clerkClient.users.getUser(userId)
  return NextResponse.json(user.privateMetadata);
}

