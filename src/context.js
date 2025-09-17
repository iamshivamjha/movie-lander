import React, { useContext, useState } from "react";
import useImprovedFetch from "./useImprovedFetch";

const AppContext = React.createContext();

// we are getting the children and that is app component in our case
const AppProvider = ({ children }) => {
  const [query, setQuery] = useState("hacker");
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    type: "movie",
    rating: "",
    mood: "",
    region: "All"
  });

  const { isLoading, isError, movie } = useImprovedFetch(query, filters);

  return (
    <AppContext.Provider value={{ 
      query, 
      movie, 
      setQuery, 
      isLoading, 
      isError, 
      filters, 
      setFilters 
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };