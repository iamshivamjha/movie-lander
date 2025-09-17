import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "./context";
import { getMovieRegion, getRegionDisplayInfo } from "./regionalUtils";

const imgUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMmMzZTUwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+";

const Movie = () => {
  const { movie, isLoading, filters } = useGlobalContext();
  
  // Filter movies by rating if specified
  const filterMoviesByRating = (movies) => {
    if (!filters.rating || !movies) return movies;
    
    return movies.filter(movie => {
      const rating = parseFloat(movie.imdbRating || 0);
      const minRating = parseFloat(filters.rating);
      return rating >= minRating;
    });
  };

  const filteredMovies = filterMoviesByRating(movie);

  if (isLoading) {
    return <div className="loading">Loading....</div>;
  }
  
  return (
    <>
      {/* if movie is present then only show data else remain as it is  */}
      <section className="movie-page">
        {(filters.rating || filters.mood || filters.genre || (filters.region && filters.region !== 'All')) && (
          <div className="filter-info">
            <p>
              {filters.region && filters.region !== 'All' && `🌍 Top-rated ${filters.region} movies`}
              {filters.region && filters.region !== 'All' && (filters.rating || filters.mood || filters.genre) && ` • `}
              {filters.mood && `🎬 ${filters.mood} movies`}
              {filters.mood && (filters.rating || filters.genre) && ` • `}
              {filters.genre && !filters.mood && filters.region === 'All' && `🏆 Top-rated ${filters.genre} movies`}
              {filters.genre && filters.mood && `Genre: ${filters.genre}`}
              {(filters.genre || filters.mood || (filters.region && filters.region !== 'All')) && filters.rating && ` • `}
              {filters.rating && `Rating ${filters.rating}+`}
              {` (${filteredMovies?.length || 0} results)`}
            </p>
          </div>
        )}
        <div className="grid grid-4-col">
          {filteredMovies
            ? filteredMovies.map((curMovieElem) => {
                const { imdbID, Title, Poster, Year, Type, imdbRating, Country } = curMovieElem;
                const movieName = Title.substring(0, 15);
                const movieRegion = getMovieRegion(curMovieElem);
                const regionInfo = getRegionDisplayInfo(movieRegion);

                return (
                  <NavLink to={`movie/${imdbID}`} key={imdbID}>
                    <div className="card">
                      <div className="card-info">
                        <h2>
                          {movieName.length > 13
                            ? `${movieName}...`
                            : movieName}
                        </h2>
                        <div className="movie-meta">
                          <span className="movie-year">{Year}</span>
                          <span className="movie-type">{Type}</span>
                          {imdbRating && <span className="movie-rating">⭐ {imdbRating}</span>}
                          <span className="movie-region" title={`${regionInfo.description} • ${Country || 'Unknown Country'}`}>
                            {regionInfo.emoji}
                          </span>
                        </div>
                        <img 
                          src={Poster === "N/A" ? imgUrl : Poster} 
                          alt={Title}
                          onError={(e) => {
                            e.target.src = imgUrl;
                          }}
                        />
                      </div>
                    </div>
                  </NavLink>
                );
              })
            : ""}
        </div>
      </section>
    </>
  );
};

export default Movie;
