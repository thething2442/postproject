'use client'
import { UserButton,useUser,SignOutButton } from "@clerk/nextjs"
export default function PostProject(){
    return(
     <div>
      <SignOutButton>
        <button>Sign Out</button>
      </SignOutButton>
      <UserButton showName />
    </div>
    )
}