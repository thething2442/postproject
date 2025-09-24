import { Users } from "lucide-react"

export function WelcomeHeader() {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl">
          <Users className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Welcome to ConnectHub</h1>
        <p className="text-muted-foreground text-pretty">
          Connect with friends, share moments, and discover new communities
        </p>
      </div>
    </div>
  )
}
