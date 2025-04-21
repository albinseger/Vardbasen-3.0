'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentProfileRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the correct student profile page
    router.push('/profil/student');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-gray-600">Omdirigerar till din profil...</p>
      </div>
    </div>
  );
} 