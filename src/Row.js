import axios from './axios';
import React, { useEffect, useState } from 'react'
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url= "http://image.tmdb.org/t/p/original/";
function Row(props) {
    const [movies,setMovies]  = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() =>{
async function fetchData() {
  const request = await axios.get(props.fetchUrl)
    setMovies(request.data.results)
    return request;
}  
fetchData();
    },[props.fetchUrl])
    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
    };

    const handleClick = (movie) => {
      console.log(movie)
      if (trailerUrl) {
        setTrailerUrl('');
      } else {
        movieTrailer(movie?.name || movie.original_title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err))
      }
    };

  return (
      <div className='row'>
      <h1>{ props.title}</h1>
      <div className="row__posters">
        {movies.map(movie =>{
         return( <img 
          key={movie.id}
          className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
          onClick={() => handleClick(movie)}
          src={`${base_url}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
          alt={movie.name}  />
         )
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
  );
}

export default Row
