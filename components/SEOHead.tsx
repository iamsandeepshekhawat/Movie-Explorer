'use client';

import Head from 'next/head';
import { Movie, MovieDetail } from '@/types/movie';

interface SEOHeadProps {
  movie?: Movie | MovieDetail;
  searchQuery?: string;
}

export function SEOHead({ movie, searchQuery }: SEOHeadProps) {
  const baseTitle = "Movie Explorer - Discover Movies & TV Series";
  const baseDescription = "Search and explore movies and TV series using the comprehensive OMDb database. Find ratings, cast, plot summaries and more.";
  
  let title = baseTitle;
  let description = baseDescription;
  let image = "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200";

  if (movie) {
    title = `${movie.Title} (${movie.Year}) - Movie Explorer`;
    description = 'Plot' in movie && movie.Plot !== 'N/A' 
      ? movie.Plot 
      : `Watch ${movie.Title} (${movie.Year}) - ${movie.Type}. Find ratings, cast, and more on Movie Explorer.`;
    
    if (movie.Poster && movie.Poster !== 'N/A') {
      image = movie.Poster;
    }
  } else if (searchQuery) {
    title = `Search results for "${searchQuery}" - Movie Explorer`;
    description = `Find movies and TV series matching "${searchQuery}". Browse through our comprehensive database of entertainment content.`;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Movie Explorer" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Movie Explorer" />
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
    
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#2563eb" />
      <link rel="apple-touch-icon" href="/icon-192x192.png" />
    </Head>
  );
}