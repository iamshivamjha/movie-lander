// Regional movie detection and filtering utilities

// Function to detect movie region based on Country and Language
export const getMovieRegion = (movie) => {
  if (!movie) return 'Unknown';
  
  const country = movie.Country?.toLowerCase() || '';
  const language = movie.Language?.toLowerCase() || '';
  const title = movie.Title?.toLowerCase() || '';
  
  // Bollywood (Indian Cinema)
  if (country.includes('india') || 
      language.includes('hindi') || 
      language.includes('tamil') || 
      language.includes('telugu') ||
      language.includes('malayalam') ||
      language.includes('kannada') ||
      language.includes('bengali') ||
      title.includes('bollywood')) {
    return 'Bollywood';
  }
  
  // Hollywood (American Cinema)
  if (country.includes('usa') || 
      country.includes('united states') || 
      (language.includes('english') && !country.includes('uk') && !country.includes('britain'))) {
    return 'Hollywood';
  }
  
  // British Cinema
  if (country.includes('uk') || 
      country.includes('britain') || 
      country.includes('england')) {
    return 'British';
  }
  
  // Korean Cinema
  if (country.includes('korea') || 
      country.includes('south korea') || 
      language.includes('korean')) {
    return 'Korean';
  }
  
  // Japanese Cinema
  if (country.includes('japan') || 
      language.includes('japanese')) {
    return 'Japanese';
  }
  
  // French Cinema
  if (country.includes('france') || 
      language.includes('french')) {
    return 'French';
  }
  
  // German Cinema
  if (country.includes('germany') || 
      language.includes('german')) {
    return 'German';
  }
  
  // Spanish Cinema
  if (country.includes('spain') || 
      country.includes('mexico') || 
      language.includes('spanish')) {
    return 'Spanish';
  }
  
  // Italian Cinema
  if (country.includes('italy') || 
      language.includes('italian')) {
    return 'Italian';
  }
  
  // Chinese Cinema
  if (country.includes('china') || 
      country.includes('hong kong') || 
      country.includes('taiwan') ||
      language.includes('chinese') ||
      language.includes('mandarin') ||
      language.includes('cantonese')) {
    return 'Chinese';
  }
  
  // Australian Cinema
  if (country.includes('australia') || 
      country.includes('australian')) {
    return 'Australian';
  }
  
  // Canadian Cinema
  if (country.includes('canada') || 
      country.includes('canadian')) {
    return 'Canadian';
  }
  
  // Brazilian Cinema
  if (country.includes('brazil') || 
      language.includes('portuguese')) {
    return 'Brazilian';
  }
  
  // Russian Cinema
  if (country.includes('russia') || 
      country.includes('soviet') ||
      language.includes('russian')) {
    return 'Russian';
  }
  
  return 'International';
};


// Regional filter options with emojis and descriptions
export const regionalOptions = {
  'Bollywood': {
    emoji: '🇮🇳',
    description: 'Indian Cinema'
  },
  'Hollywood': {
    emoji: '🇺🇸',
    description: 'American Cinema'
  },
  'British': {
    emoji: '🇬🇧',
    description: 'British Cinema'
  },
  'Korean': {
    emoji: '🇰🇷',
    description: 'Korean Cinema'
  },
  'Japanese': {
    emoji: '🇯🇵',
    description: 'Japanese Cinema'
  },
  'French': {
    emoji: '🇫🇷',
    description: 'French Cinema'
  },
  'German': {
    emoji: '🇩🇪',
    description: 'German Cinema'
  },
  'Spanish': {
    emoji: '🇪🇸',
    description: 'Spanish Cinema'
  },
  'Italian': {
    emoji: '🇮🇹',
    description: 'Italian Cinema'
  },
  'Chinese': {
    emoji: '🇨🇳',
    description: 'Chinese Cinema'
  }
};


// Function to filter movies by region
export const filterMoviesByRegion = (movies, region) => {
  if (!movies || !Array.isArray(movies)) return [];
  if (!region || region === 'All') return movies;
  
  return movies.filter(movie => {
    const movieRegion = getMovieRegion(movie);
    return movieRegion === region;
  });
};

// Function to get region display info
export const getRegionDisplayInfo = (region) => {
  const regionData = regionalOptions[region];
  if (!regionData) return { emoji: '🌍', description: region };
  
  return {
    emoji: regionData.emoji,
    description: regionData.description,
    fullName: `${regionData.emoji} ${region}`
  };
};
