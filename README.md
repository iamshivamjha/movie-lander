# 🎬 MovieLander - Advanced Movie Search Platform

A comprehensive movie search platform that helps you discover, explore, and find your favorite movies from around the world. Built with React and powered by the OMDB API.

🌐 **Live Demo**: [shivam-movie-lander.netlify.app](https://shivam-movie-lander.netlify.app)

## ✨ Features

### 🔍 **Smart Search & Discovery**
- **Advanced Movie Search** - Search by title with real-time results
- **Top-rated Movies by Genre** - Get the best movies in each category with improved search quality
- **Multiple Search Strategy** - Uses multiple search terms and sorting to find the highest-rated movies
- **Duplicate Removal** - Smart filtering to avoid duplicate results

### 🌍 **Regional Cinema Explorer**
- **10+ Regional Filters** - Explore movies from different countries and cultures:
  - 🇮🇳 **Bollywood** (Indian Cinema)
  - 🇺🇸 **Hollywood** (American Cinema)
  - 🇬🇧 **British Cinema**
  - 🇰🇷 **Korean Cinema**
  - 🇯🇵 **Japanese Cinema**
  - 🇫🇷 **French Cinema**
  - 🇩🇪 **German Cinema**
  - 🇪🇸 **Spanish Cinema**
  - 🇮🇹 **Italian Cinema**
  - 🇨🇳 **Chinese Cinema**
- **Smart Region Detection** - Automatically detects movie regions based on Country and Language data from OMDB
- **Top-rated Regional Movies** - Shows the highest-rated movies from each region

### 🎭 **Movie Mood Matcher**
- **Mood-based Discovery** - Find movies based on your current mood:
  - 😄 **Funny** - Comedy and Comedy-Drama
  - 💕 **Romantic** - Romance and Romantic Comedy
  - 💥 **Action-Packed** - Action, Adventure, and Thriller
  - 👻 **Scary** - Horror and Thriller
  - 🎭 **Dramatic** - Drama and Biography
  - 🚀 **Sci-Fi** - Science Fiction and Fantasy
  - 🎵 **Musical** - Music and Musical films
  - 🕵️ **Mystery** - Mystery and Crime
  - 🏆 **Inspiring** - Biography, Drama, and Sports
  - 🎨 **Artistic** - Drama, Biography, and Film-Noir

### 🔧 **Advanced Search Filters**
- **Content Type Filter** - Movies, TV Series, or Episodes
- **Year Range** - Search movies from specific years (1900-2024)
- **Minimum Rating** - Filter by IMDB rating (5.0+ to 9.0+)
- **Smart Filtering** - All filters work together seamlessly

### 📱 **User Experience**
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Watch Now Button** - Direct links to IMDB for each movie
- **Movie Details** - Comprehensive information including:
  - Plot summaries
  - Cast and crew
  - Ratings and reviews
  - Release dates and runtime
  - Country and language information
  - Genre classifications
- **Loading States** - Smooth loading animations and error handling
- **Beautiful UI** - Modern, clean interface with regional emojis and visual indicators

## 🚀 Technology Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.15.0
- **State Management**: React Context API
- **API**: OMDB API for movie data
- **Styling**: CSS3 with responsive design
- **Build Tool**: Create React App
- **Deployment**: Netlify

## 🏗️ Project Structure

```
src/
├── components/
│   ├── App.js              # Main routing component
│   ├── Home.js             # Home page layout
│   ├── Movies.js           # Movie grid display
│   ├── Search.js           # Search interface with filters
│   └── SingleMovie.js      # Individual movie details
├── hooks/
│   ├── useFetch.js         # Basic API fetching hook
│   └── useImprovedFetch.js # Advanced search with multiple strategies
├── utils/
│   ├── context.js          # Global state management
│   ├── regionalUtils.js    # Regional movie detection and filtering
│   └── searchUtils.js      # Search optimization utilities
└── index.js                # App entry point
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamshivamjha/movie-lander.git
   cd movie-lander
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

The build folder will contain the optimized production build ready for deployment.

## 📡 API Integration

### OMDB API
The application uses the OMDB API for all movie data:
- **Search**: Movie titles and basic information
- **Details**: Comprehensive movie information including ratings, plot, cast, etc.
- **Filtering**: Country and language data for regional classification

### API Features Used
- Movie search by title
- Detailed movie information
- IMDB ratings and metadata
- Country and language information
- Genre classifications

## 🌟 Key Features Explained

### Regional Movie Detection
The app intelligently detects movie regions using:
- **Country Information** - Primary region detection
- **Language Data** - Secondary region classification
- **Title Analysis** - Fallback for edge cases

### Enhanced Search Quality
- **Multiple Search Terms** - Uses popular movie titles for each genre
- **Rating-based Sorting** - Always shows highest-rated movies first
- **Duplicate Filtering** - Removes duplicate results across searches
- **API-based Filtering** - All filtering done using real API data

### Responsive Design
- **Mobile-first approach** - Optimized for all screen sizes
- **Touch-friendly interface** - Easy navigation on mobile devices
- **Fast loading** - Optimized images and efficient API calls

## 🚀 Deployment

The application is automatically deployed to Netlify:
- **Production URL**: [shivam-movie-lander.netlify.app](https://shivam-movie-lander.netlify.app)
- **Automatic builds** on every push to main branch
- **CDN distribution** for fast global access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Shivam Jha**
- GitHub: [@iamshivamjha](https://github.com/iamshivamjha)
- Live Demo: [shivam-movie-lander.netlify.app](https://shivam-movie-lander.netlify.app)

---

⭐ **Star this repository if you found it helpful!**

## 🔄 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: This is a one-way operation. Once you eject, you can't go back!**

## 📚 Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [OMDB API Documentation](http://www.omdbapi.com/)