import { useState, useEffect, useCallback } from "react";
import { API_URL } from "./useFetch";
import { getRandomPopularTerms, sortMoviesByRating, removeDuplicateMovies, getTopMovies, popularSearchTerms } from "./searchUtils";
import { getMovieRegion } from "./regionalUtils";

const useImprovedFetch = (query, filters) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = useCallback(async (searchQuery) => {
    try {
      const res = await fetch(`${API_URL}&s=${searchQuery}`);
      const data = await res.json();

      console.log(`Search for "${searchQuery}":`, data);
      
      if (data.Response === "True") {
        return data.Search || [];
      } else {
        console.log(`No results for "${searchQuery}":`, data.Error);
        return [];
      }
    } catch (error) {
      console.log(`Error searching for "${searchQuery}":`, error);
      return [];
    }
  }, []);

  const getMovieDetails = useCallback(async (imdbID) => {
    try {
      const res = await fetch(`${API_URL}&i=${imdbID}`);
      const data = await res.json();
      
      if (data.Response === "True") {
        return data;
      }
      return null;
    } catch (error) {
      console.log(`Error getting details for ${imdbID}:`, error);
      return null;
    }
  }, []);

  const searchWithPopularTerms = useCallback(async (genre) => {
    const popularTerms = getRandomPopularTerms(genre, 3);
    console.log(`Searching ${genre} with terms:`, popularTerms);
    
    const allResults = [];
    
    // Search with popular terms
    for (const term of popularTerms) {
      const results = await getMovie(term);
      allResults.push(...results);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Remove duplicates
    const uniqueResults = removeDuplicateMovies(allResults);
    
    // Get detailed info for each movie to get ratings
    const detailedResults = [];
    for (const movie of uniqueResults.slice(0, 20)) { // Limit to avoid too many API calls
      const details = await getMovieDetails(movie.imdbID);
      if (details) {
        detailedResults.push({
          ...movie,
          imdbRating: details.imdbRating,
          Genre: details.Genre,
          Plot: details.Plot
        });
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Sort by rating and get top 10
    const sortedResults = sortMoviesByRating(detailedResults);
    return getTopMovies(sortedResults, 10);
  }, [getMovie, getMovieDetails]);

  const searchTopRegionalMovies = useCallback(async (region) => {
    console.log(`Searching for top ${region} movies using API`);
    
    // Define search terms for each region to get movies from that country
    const regionalSearchTerms = {
      'Bollywood': ['India', 'Hindi', 'Bollywood', 'Mumbai', 'Delhi'],
      'Hollywood': ['America', 'USA', 'Hollywood', 'California', 'New York'],
      'British': ['Britain', 'England', 'London', 'Manchester', 'Liverpool'],
      'Korean': ['Korea', 'Seoul', 'Korean', 'South Korea', 'Busan'],
      'Japanese': ['Japan', 'Tokyo', 'Japanese', 'Osaka', 'Kyoto'],
      'German': ['Germany', 'Berlin', 'German', 'Munich', 'Hamburg'],
      'French': ['France', 'Paris', 'French', 'Lyon', 'Marseille'],
      'Spanish': ['Spain', 'Madrid', 'Spanish', 'Barcelona', 'Mexico'],
      'Italian': ['Italy', 'Rome', 'Italian', 'Milan', 'Naples'],
      'Chinese': ['China', 'Beijing', 'Chinese', 'Hong Kong', 'Taiwan']
    };
    
    const searchTerms = regionalSearchTerms[region] || [region];
    const allResults = [];
    
    // Search with multiple terms to get movies from that region
    for (const term of searchTerms.slice(0, 3)) { // Use 3 terms max for speed
      const results = await getMovie(term);
      allResults.push(...results);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Remove duplicates
    const uniqueResults = removeDuplicateMovies(allResults);
    
    // Get detailed info and filter by region
    const regionalMovies = [];
    for (const movie of uniqueResults.slice(0, 20)) {
      const details = await getMovieDetails(movie.imdbID);
      if (details && details.imdbRating !== 'N/A') {
        const movieWithDetails = {
          ...movie,
          imdbRating: details.imdbRating,
          Genre: details.Genre,
          Plot: details.Plot,
          Country: details.Country,
          Language: details.Language
        };
        
        // Check if movie belongs to the selected region
        const movieRegion = getMovieRegion(movieWithDetails);
        if (movieRegion === region) {
          regionalMovies.push(movieWithDetails);
        }
      }
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Sort by rating and return top 10
    const sortedResults = sortMoviesByRating(regionalMovies);
    return getTopMovies(sortedResults, 10);
  }, [getMovie, getMovieDetails]);

  const performSearch = useCallback(async () => {
    setIsLoading(true);
    setIsError({ show: "false", msg: "" });
    
    try {
      let results = [];
      
      // Check if this is a regional search
      const isRegionalSearch = filters.region && filters.region !== 'All';
      
      if (isRegionalSearch) {
        console.log(`Performing regional search for: ${filters.region}`);
        results = await searchTopRegionalMovies(filters.region);
      } else {
        // Check if this is a genre search with popular terms
        const isGenreSearch = filters.genre && !filters.mood;
        
        if (isGenreSearch && popularSearchTerms[filters.genre]) {
          console.log(`Performing improved search for genre: ${filters.genre}`);
          results = await searchWithPopularTerms(filters.genre);
        } else {
          // Regular search
          console.log(`Performing regular search for: ${query}`);
          const searchResults = await getMovie(query);
          results = searchResults;
        }
      }
      
      if (results.length > 0) {
        setMovie(results);
        setIsError({ show: "false", msg: "" });
      } else {
        setMovie(null);
        setIsError({ 
          show: "true", 
          msg: `No movies found for "${query}". Try a different search term.` 
        });
      }
    } catch (error) {
      console.log("Search error:", error);
      setMovie(null);
      setIsError({ 
        show: "true", 
        msg: "An error occurred while searching. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  }, [query, filters.genre, filters.mood, filters.region, searchWithPopularTerms, searchTopRegionalMovies, getMovie]);

  // Debounced search
  useEffect(() => {
    const timeOut = setTimeout(() => {
      performSearch();
    }, 1000);
    
    console.log("Improved search set");
    return () => {
      clearTimeout(timeOut);
      console.log("Improved search clear");
    };
  }, [performSearch]);

  return { isLoading, isError, movie };
};

export default useImprovedFetch;