'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Don't show navbar on login page
  if (pathname === '/login') {
    return null
  }

  const handleLogout = async () => {
    // TODO: Use Firebase Auth to logout
    // await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      <nav className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="block outline-none focus:outline-none">
                <Image
                  src="/logo.svg"
                  alt="Monitor Me"
                  width={50}
                  height={50}
                  loading="eager"
                  className="rounded-lg"
                />
              </Link>
            </div>

            {/* Desktop logout button */}
            <div className="hidden md:block">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut />
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile side nav */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Side nav */}
          <div className="fixed right-0 top-0 z-50 h-full w-64 bg-background shadow-lg md:hidden">
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X />
              </Button>
            </div>
            <div className="p-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut />
                Logout
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
