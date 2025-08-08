import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Movie Explorer - Discover Movies & TV Series',
    template: '%s | Movie Explorer'
  },
  description: 'Search and explore movies and TV series using the comprehensive OMDb database. Find ratings, cast, plot summaries and more.',
  keywords: ['movies', 'tv series', 'entertainment', 'omdb', 'film database', 'movie search'],
  authors: [{ name: 'Movie Explorer Team' }],
  creator: 'Movie Explorer',
  publisher: 'Movie Explorer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://movie-explorer.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Movie Explorer - Discover Movies & TV Series',
    description: 'Search and explore movies and TV series using the comprehensive OMDb database',
    url: 'https://movie-explorer.vercel.app',
    siteName: 'Movie Explorer',
    images: [
      {
        url: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Movie Explorer - Discover Movies & TV Series',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movie Explorer - Discover Movies & TV Series',
    description: 'Search and explore movies and TV series using the comprehensive OMDb database',
    images: ['https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}