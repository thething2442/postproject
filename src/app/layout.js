import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider signInForceRedirectUrl='/postproject'>
          <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
