'use client';

import { cn } from '@/lib/utils';
import { MainNav } from './MainNav';
import { Toaster } from '@/components/ui/sonner';

export function PageContainer({ 
  children, 
  className, 
  withNav = true,
  withPadding = true 
}) {
  return (
    <div className={cn(
      'flex flex-col min-h-screen',
      withNav ? 'lg:pl-64' : ''
    )}>
      {withNav && <MainNav />}
      
      <main className={cn(
        'flex-1',
        withPadding && 'p-4 md:p-6 lg:p-8',
        className
      )}>
        <div className="mx-auto w-full max-w-7xl">
          {children}
        </div>
      </main>
      
      <Toaster position="top-center" richColors />
    </div>
  );
}
