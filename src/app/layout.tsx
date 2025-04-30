import './globals.css';
import { Inter } from 'next/font/google';
import { ProfileProvider } from '@/context/ProfileContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vårdbasen',
  description: 'Hitta ditt nästa sommarjobb i Norge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className={inter.className}>
        <ProfileProvider>
          <div className="min-h-screen flex flex-col">
            {/* The Header component will be included in each page */}
            <div className="flex-grow flex flex-col">
              {/* This wrapper ensures consistent spacing below header for all pages */}
              <div className="pt-16">
                {children}
              </div>
            </div>
          </div>
        </ProfileProvider>
      </body>
    </html>
  );
}
