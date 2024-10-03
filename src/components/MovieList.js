import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import moviesData from '../data/moviesData';


function MovieList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

const getMovies = async (searchTerm) => { 
  const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=eed5bdb0`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if(data.Search){
      setFilteredMovies(data.Search);
    }
    else
    {
      setFilteredMovies([]);
    }
  } catch (error) {
    console.error('Error Loading Movies',error); 
    setFilteredMovies([]);

}
};

useEffect(() => {
  if(searchTerm){
    getMovies(searchTerm)
  }
;}, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filterMovies = (term) => {
  //   const filtered = moviesData.filter(movie =>
  //     movie.title.toLowerCase().includes(term.toLowerCase())
  //   );
  //   setFilteredMovies(filtered);
  // };

  return (
    <div className="movie-list">
      <h2>Movie List</h2>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>
              {movie.Title} ({movie.Year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;