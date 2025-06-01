import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    default: 'Blogsite App',
    template: '%s | Blogsite App'
  },
  description: 'A simple blog application built with Next.js and TypeScript'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased min-h-screen bg-background`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <main>{children}</main>
          <Toaster richColors position='top-center' />
        </ThemeProvider>
      </body>
    </html>
  );
}
