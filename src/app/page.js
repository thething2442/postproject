'use client'
import { useUser, useClerk } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { useState,useEffect } from "react";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

export default function LoginPage() {
  const {user,isLoaded,isSignedIn} = useUser();
  const { signOut } = useClerk();

  if(!isLoaded){return <div>Loading...</div> }
  if(!isSignedIn){redirect('/sign-up')}
  return (
    <div className="min-h-screen bg-background dark p-4 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user.imageUrl} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ redirectUrl: '/sign-in' })}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>  
  )
}
