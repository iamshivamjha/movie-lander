import React, { useState } from "react";
import { useGlobalContext } from "./context";
import { regionalOptions, getRegionDisplayInfo } from "./regionalUtils";

const Search = () => {
  const { query, setQuery, isError, filters, setFilters } = useGlobalContext();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const genres = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
    "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History",
    "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi",
    "Sport", "Thriller", "War", "Western"
  ];

  // Mood to Genre mapping
  const moodGenres = {
    "😄 Funny": ["Comedy", "Comedy-Drama"],
    "💕 Romantic": ["Romance", "Romantic Comedy"],
    "💥 Action-Packed": ["Action", "Adventure", "Thriller"],
    "👻 Scary": ["Horror", "Thriller"],
    "🎭 Dramatic": ["Drama", "Biography"],
    "🚀 Sci-Fi": ["Sci-Fi", "Fantasy"],
    "🎵 Musical": ["Music", "Musical"],
    "🕵️ Mystery": ["Mystery", "Crime"],
    "🏆 Inspiring": ["Biography", "Drama", "Sport"],
    "🎨 Artistic": ["Drama", "Biography", "Film-Noir"]
  };

  const moods = Object.keys(moodGenres);

  const handleGenreClick = (genre) => {
    setFilters({ ...filters, genre, mood: "", region: "All" });
    setQuery(genre); // Set the search query to the genre
  };

  const handleRegionClick = (region) => {
    const regionInfo = getRegionDisplayInfo(region);
    setFilters({ ...filters, region, genre: "", mood: "" });
    setQuery(regionInfo.fullName); // Set the search query to the region
  };

  const handleMoodClick = (mood) => {
    const moodGenreList = moodGenres[mood];
    // Use the first genre from the mood mapping as the search query
    const primaryGenre = moodGenreList[0];
    setFilters({ ...filters, mood, genre: primaryGenre, region: "All" });
    setQuery(primaryGenre);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const clearFilters = () => {
    setFilters({ genre: "", year: "", type: "movie", rating: "", mood: "", region: "All" });
    setQuery("");
  };

  return (
    <>
      <section className="search-section">
        <h2>Search Your Favourite Movie</h2>
        
        {/* Basic Search */}
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search movie by title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="button" 
              className="advanced-toggle-btn"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? "Hide Filters" : "Advanced Filters"}
            </button>
          </div>
        </form>

        {/* Regional Cinema Filter */}
        <div className="regional-filter">
          <h3>🌍 Explore World Cinema</h3>
          <p className="regional-subtitle">Discover movies from different countries and cultures</p>
          <div className="regional-buttons">
            <button
              className={`regional-btn ${filters.region === 'All' ? 'active' : ''}`}
              onClick={() => handleRegionClick('All')}
              title="Show all movies"
            >
              🌍 All Regions
            </button>
            {Object.keys(regionalOptions).map((region) => {
              const regionInfo = getRegionDisplayInfo(region);
              return (
                <button
                  key={region}
                  className={`regional-btn ${filters.region === region ? 'active' : ''}`}
                  onClick={() => handleRegionClick(region)}
                  title={`Find ${region} movies`}
                >
                  {regionInfo.fullName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Movie Mood Matcher */}
        <div className="mood-matcher">
          <h3>🎬 What's Your Mood?</h3>
          <p className="mood-subtitle">Tell us what you feel like watching</p>
          <div className="mood-buttons">
            {moods.map((mood) => (
              <button
                key={mood}
                className={`mood-btn ${filters.mood === mood ? 'active' : ''}`}
                onClick={() => handleMoodClick(mood)}
                title={`Find ${mood.split(' ')[1]} movies`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Genre Filter Buttons */}
        <div className="genre-filters">
          <h3>🏆 Top-Rated Movies by Genre</h3>
          <p className="genre-subtitle">Get the best movies in each category</p>
          <div className="genre-buttons">
            {genres.map((genre) => (
              <button
                key={genre}
                className={`genre-btn ${filters.genre === genre && !filters.mood && filters.region === 'All' ? 'active' : ''}`}
                onClick={() => handleGenreClick(genre)}
                title={`Show top-rated ${genre} movies`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Search Filters */}
        {showAdvanced && (
          <div className="advanced-filters">
            <h3>Advanced Filters</h3>
            <div className="filter-row">
              <div className="filter-group">
                <label>Type:</label>
                <select 
                  value={filters.type} 
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="movie">Movies</option>
                  <option value="series">TV Series</option>
                  <option value="episode">Episodes</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Year:</label>
                <input
                  type="number"
                  placeholder="2023"
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  min="1900"
                  max="2024"
                />
              </div>
              
              <div className="filter-group">
                <label>Min Rating:</label>
                <select 
                  value={filters.rating} 
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                >
                  <option value="">Any Rating</option>
                  <option value="9">9.0+</option>
                  <option value="8">8.0+</option>
                  <option value="7">7.0+</option>
                  <option value="6">6.0+</option>
                  <option value="5">5.0+</option>
                </select>
              </div>
              
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All
              </button>
            </div>
          </div>
        )}

        <div className="card-error">
          <p>{isError.show && isError.msg}</p>
        </div>
      </section>
    </>
  );
};

export default Search;
