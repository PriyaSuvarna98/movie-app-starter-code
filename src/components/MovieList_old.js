// src/components/MovieList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moviesData from '../data/moviesData';

function MovieList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(moviesData);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterMovies(event.target.value);
  };

  const filterMovies = (term) => {
    const filtered = moviesData.filter(movie =>
      movie.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

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
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              {movie.title} ({movie.year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
