
// Popular search terms for each genre to get high-quality results
export const popularSearchTerms = {
  "Action": [
    "The Dark Knight", "Inception", "Mad Max", "John Wick", "Mission Impossible",
    "Avengers", "Fast and Furious", "Terminator", "Die Hard", "Matrix"
  ],
  "Comedy": [
    "The Hangover", "Superbad", "Anchorman", "Step Brothers", "Tropic Thunder",
    "Dumb and Dumber", "Meet the Parents", "Rush Hour", "Austin Powers", "Borat"
  ],
  "Horror": [
    "The Conjuring", "Get Out", "Hereditary", "A Quiet Place", "The Babadook",
    "It", "The Shining", "Halloween", "Scream", "A Nightmare on Elm Street"
  ],
  "Drama": [
    "The Shawshank Redemption", "Forrest Gump", "The Godfather", "Pulp Fiction", "Schindler's List",
    "Goodfellas", "Casablanca", "Citizen Kane", "The Wizard of Oz", "Gone with the Wind"
  ],
  "Romance": [
    "The Notebook", "Titanic", "Casablanca", "When Harry Met Sally", "Pretty Woman",
    "Sleepless in Seattle", "You've Got Mail", "The Princess Bride", "Ghost", "Dirty Dancing"
  ],
  "Sci-Fi": [
    "Star Wars", "Blade Runner", "Alien", "The Matrix", "Interstellar",
    "Avatar", "Terminator", "Back to the Future", "E.T.", "Close Encounters"
  ],
  "Thriller": [
    "Se7en", "Silence of the Lambs", "Psycho", "The Usual Suspects", "Memento",
    "Zodiac", "Gone Girl", "No Country for Old Men", "The Sixth Sense", "Vertigo"
  ],
  "Animation": [
    "Toy Story", "Finding Nemo", "The Lion King", "Spirited Away", "Up",
    "WALL-E", "Inside Out", "Coco", "Moana", "Frozen"
  ],
  "Adventure": [
    "Indiana Jones", "Pirates of the Caribbean", "Jurassic Park", "The Lord of the Rings", "Avatar",
    "Star Wars", "Back to the Future", "National Treasure", "Jumanji", "The Mummy"
  ],
  "Crime": [
    "The Godfather", "Goodfellas", "Pulp Fiction", "Casino", "Scarface",
    "Heat", "The Departed", "L.A. Confidential", "Chinatown", "The Usual Suspects"
  ],
  "Biography": [
    "Schindler's List", "Forrest Gump", "The Pursuit of Happyness", "The Social Network", "Catch Me If You Can",
    "A Beautiful Mind", "The King's Speech", "Lincoln", "The Theory of Everything", "Hidden Figures"
  ],
  "Family": [
    "The Lion King", "Finding Nemo", "Toy Story", "Up", "Moana",
    "Frozen", "Inside Out", "Coco", "The Incredibles", "Ratatouille"
  ],
  "Fantasy": [
    "The Lord of the Rings", "Harry Potter", "The Chronicles of Narnia", "Pan's Labyrinth", "Big Fish",
    "The Princess Bride", "Edward Scissorhands", "Beetlejuice", "The Nightmare Before Christmas", "Labyrinth"
  ],
  "History": [
    "Schindler's List", "Saving Private Ryan", "Braveheart", "Gladiator", "The Patriot",
    "Lincoln", "Dunkirk", "Apollo 13", "The Last Samurai", "Master and Commander"
  ],
  "Music": [
    "Bohemian Rhapsody", "A Star Is Born", "La La Land", "Mamma Mia", "The Greatest Showman",
    "Rocketman", "Whiplash", "Begin Again", "Sing Street", "Pitch Perfect"
  ],
  "Musical": [
    "The Sound of Music", "West Side Story", "Grease", "Mamma Mia", "La La Land",
    "The Greatest Showman", "Chicago", "Moulin Rouge", "Hairspray", "Les Misérables"
  ],
  "Mystery": [
    "The Sixth Sense", "The Usual Suspects", "Gone Girl", "Shutter Island", "Prisoners",
    "Zodiac", "Memento", "The Prestige", "Se7en", "Vertigo"
  ],
  "Sport": [
    "Rocky", "Remember the Titans", "Rudy", "The Blind Side", "Moneyball",
    "Field of Dreams", "Chariots of Fire", "Seabiscuit", "Miracle", "Invictus"
  ],
  "War": [
    "Saving Private Ryan", "Apocalypse Now", "Full Metal Jacket", "The Hurt Locker", "Dunkirk",
    "1917", "Platoon", "Black Hawk Down", "We Were Soldiers", "Letters from Iwo Jima"
  ],
  "Western": [
    "The Good, the Bad and the Ugly", "Once Upon a Time in the West", "Unforgiven", "True Grit", "Django Unchained",
    "The Magnificent Seven", "High Noon", "Shane", "Butch Cassidy and the Sundance Kid", "The Searchers"
  ],
  "Documentary": [
    "Bowling for Columbine", "Fahrenheit 9/11", "March of the Penguins", "An Inconvenient Truth", "Super Size Me",
    "The Cove", "Blackfish", "Amy", "OJ: Made in America", "13th"
  ],
  "Film-Noir": [
    "Double Indemnity", "The Maltese Falcon", "Casablanca", "Sunset Boulevard", "The Third Man",
    "Touch of Evil", "The Big Sleep", "Mildred Pierce", "Out of the Past", "Gilda"
  ]
};

// Function to get random popular terms for a genre (to avoid API rate limits)
export const getRandomPopularTerms = (genre, count = 3) => {
  const terms = popularSearchTerms[genre] || [genre];
  const shuffled = [...terms].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to sort movies by rating (highest first)
export const sortMoviesByRating = (movies) => {
  if (!movies || !Array.isArray(movies)) return [];
  
  return movies.sort((a, b) => {
    const ratingA = parseFloat(a.imdbRating) || 0;
    const ratingB = parseFloat(b.imdbRating) || 0;
    return ratingB - ratingA; // Descending order (highest first)
  });
};

// Function to remove duplicates based on imdbID
export const removeDuplicateMovies = (movies) => {
  if (!movies || !Array.isArray(movies)) return [];
  
  const seen = new Set();
  return movies.filter(movie => {
    if (seen.has(movie.imdbID)) {
      return false;
    }
    seen.add(movie.imdbID);
    return true;
  });
};

// Function to get top N movies
export const getTopMovies = (movies, count = 10) => {
  return movies.slice(0, count);
};
