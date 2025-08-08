import { SearchResponse, MovieDetail, SearchFilters } from '@/types/movie';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || '414230e0';
const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(
  query: string, 
  filters: SearchFilters, 
  page: number = 1
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: query,
    page: page.toString(),
  });

  if (filters.type) {
    params.append('type', filters.type);
  }

  if (filters.year) {
    params.append('y', filters.year);
  }

  const response = await fetch(`${BASE_URL}?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  return response.json();
}

export async function getMovieDetails(imdbId: string): Promise<MovieDetail> {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: imdbId,
    plot: 'full',
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  return response.json();
}