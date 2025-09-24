
import { LoginForm } from "@/src/app/components/login-form"
import { WelcomeHeader } from "@/src/app/components/welcome-header"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <WelcomeHeader />
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
