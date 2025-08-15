"use client"
import React, { useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

function Header() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're on the dashboard or course pages
  const isDashboard = pathname?.startsWith('/dashboard');
  const isCoursePage = pathname?.startsWith('/course');
  const isAuthPage = pathname?.startsWith('/sign-');

  // Only show sign in/out button on relevant pages
  const showAuthButtons = !isDashboard && !isAuthPage;

  // Set redirect URLs for sign in/up flows
  useEffect(() => {
    if (isSignedIn && isAuthPage) {
      // If user is signed in and on an auth page, redirect to dashboard
      router.push('/dashboard');
    }
  }, [isSignedIn, isAuthPage, router]);

  // Handle logo click - go to dashboard if signed in, home if not
  const handleLogoClick = (e) => {
    if (isSignedIn) {
      e.preventDefault();
      router.push('/dashboard');
    }
  };

  return (
    <header className='overflow-hidden bg-black bg-cover bg-no-repeat bg-center bg-fixed'>
      <div className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] p-2 flex justify-between items-center border-4 border-[#000] rounded-3xl">
        <Link 
          href={isSignedIn ? '/dashboard' : '/'}
          onClick={handleLogoClick}
          className="flex items-center"
        >
          <Image 
            src={'./name-logo-black.svg'} 
            alt="Logo" 
            width={50} 
            height={50} 
            className="cursor-pointer"
          />
        </Link>
        
        {showAuthButtons && (
          <div className="flex items-center gap-2">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/dashboard')}
                  className="hover:bg-white/10 hover:text-white"
                >
                  Go to Dashboard
                </Button>
                <SignOutButton>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/10"
                    onClick={() => router.push('/')}
                  >
                    Sign Out
                  </Button>
                </SignOutButton>
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button 
                  className="hover:bg-slate-700 transition duration-300 ease-in-out"
                  onClick={() => {
                    const redirectUrl = isCoursePage ? window.location.pathname : '/dashboard';
                    sessionStorage.setItem('__clerk_post_sign_in_redirect_url', redirectUrl);
                    sessionStorage.setItem('__clerk_post_sign_up_redirect_url', redirectUrl);
                  }}
                >
                  Get started
                </Button>
              </SignInButton>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
