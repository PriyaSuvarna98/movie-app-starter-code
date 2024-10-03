// src/components/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import moviesData from '../data/moviesData';
import '../App.css';

function MovieDetail() {
  const { imdbID } = useParams();
  const [moviesData, setMoviesData] = useState('');

  const getMovieDetails = async (imdbID) => {
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=eed5bdb0`;

    try {
      const response = await fetch(url);
      const movie = await response.json();
      if(movie.Response === "True"){
        setMoviesData(movie);
      }
      else
      {
        setMoviesData('');
      }
    } catch (error) {
      console.error('Error Loading Movies',error); 
      setMoviesData('');
  
    }
  }
  //const movie = moviesData.find(movie => movie.id === parseInt(id));
  useEffect(() => {
    getMovieDetails(imdbID);
  }, [imdbID]);

  if (moviesData.length === 0) return <h2>Movie not found</h2>;

  return (
    <div>
      <h2>{moviesData.Title} ({moviesData.Year})</h2>
      <p><strong>DIRECTOR:</strong> {moviesData.Director}</p>
      <img src={moviesData.Poster} alt={`${moviesData.Title} poster`} />
      <p><strong>PLOT:</strong> {moviesData.Plot}</p>
      <p><strong>ID:</strong> {moviesData.imdbID}</p>
    </div>
  );
}

export default MovieDetail;
