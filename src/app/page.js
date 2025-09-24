'use client'
import { UserButton } from "@clerk/nextjs"
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <UserButton />
    </div>
  )
}
