import React from "react";

const MovieCard = ({movie : 
    {title, poster_path, overview, release_date, vote_average}
}) => {
    return (
        <div  className="movie-card">
            <img 
            src= {poster_path ? `http://image.tmdb.org/t/p/w500/ ${poster_path}` : '/No-Poster.png'}
            />
            {/* <p className='text-white'>{title}</p> */}
        </div>
    );
}
export default MovieCard;