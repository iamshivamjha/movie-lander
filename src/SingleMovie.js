import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import useFetch from "./useFetch";

const SingleMovie = () => {
  const { id } = useParams();
  const [streamingInfo, setStreamingInfo] = useState(null);
  const [isLoadingStreaming, setIsLoadingStreaming] = useState(false);
  
  console.log(id);

  const { isLoading, movie } = useFetch(`&i=${id}`);

  const fetchStreamingInfo = useCallback(async (imdbId) => {
    setIsLoadingStreaming(true);
    try {
      // Simple solution: Redirect to IMDB where users can find streaming info
      // This is more reliable than dealing with API issues
      setStreamingInfo({ 
        imdb: [{ 
          link: `https://www.imdb.com/title/${imdbId}/` 
        }] 
      });
    } catch (error) {
      console.log('Streaming info error:', error);
      setStreamingInfo(null);
    } finally {
      setIsLoadingStreaming(false);
    }
  }, []);

  // Fetch streaming availability when movie loads
  useEffect(() => {
    if (movie && movie.imdbID) {
      fetchStreamingInfo(movie.imdbID);
    }
  }, [movie, fetchStreamingInfo]);

  const getWatchNowUrl = () => {
    if (!streamingInfo) return null;
    
    console.log('Available platforms:', Object.keys(streamingInfo));
    
    // Check for IMDB link (our reliable fallback)
    if (streamingInfo.imdb && streamingInfo.imdb.length > 0) {
      const service = streamingInfo.imdb[0];
      if (service.link) {
        return { url: service.link, platform: 'IMDB' };
      }
    }
    
    // Priority order for platforms (most popular first)
    const platforms = ['netflix', 'amazon', 'disney', 'hulu', 'hbo', 'apple', 'paramount', 'peacock'];
    
    for (const platform of platforms) {
      if (streamingInfo[platform] && streamingInfo[platform].length > 0) {
        const service = streamingInfo[platform][0];
        console.log(`${platform} service:`, service);
        if (service.link) {
          return { url: service.link, platform: platform };
        }
      }
    }
    return null;
  };

  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  const watchNowData = getWatchNowUrl();

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img 
            src={movie.Poster === "N/A" ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNzUwIiBmaWxsPSIjMmMzZTUwIi8+Cjx0ZXh0IHg9IjI1MCIgeT0iMzc1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+" : movie.Poster} 
            alt={movie.Title}
            onError={(e) => {
              e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNzUwIiBmaWxsPSIjMmMzZTUwIi8+Cjx0ZXh0IHg9IjI1MCIgeT0iMzc1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+";
            }}
          />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className="card-text"><strong>Year:</strong> {movie.Year}</p>
          <p className="card-text"><strong>Type:</strong> {movie.Type}</p>
          <p className="card-text"><strong>Rating:</strong> {movie.imdbRating || 'N/A'}</p>
          <p className="card-text"><strong>Country:</strong> {movie.Country || 'N/A'}</p>
          <p className="card-text"><strong>Released:</strong> {movie.Released || 'N/A'}</p>
          <p className="card-text"><strong>Genre:</strong> {movie.Genre || 'N/A'}</p>
          <div className="button-container">
            <NavLink to="/" className="back-btn">
              Go Back
            </NavLink>
            {isLoadingStreaming ? (
              <button className="watch-now-btn loading" disabled>
                Checking Availability...
              </button>
            ) : watchNowData ? (
              <a 
                href={watchNowData.url} 
                className="watch-now-btn" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Watch Now on {watchNowData.platform.charAt(0).toUpperCase() + watchNowData.platform.slice(1)}
              </a>
            ) : (
              <button className="watch-now-btn unavailable" disabled>
                Not Available to Stream
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
