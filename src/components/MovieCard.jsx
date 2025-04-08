    import React from "react";

const MovieCard = ({movie : 
    {title, poster_path, overview, release_date, vote_average,original_language}
}) => {
    return (
        <div  className="movie-card">
            <img 
            src= {poster_path ? `http://image.tmdb.org/t/p/w500/${poster_path}` : '/No-Poster.png'}
            alt={title}/>
            <div className="mt-4">
                <h3>{title}</h3>
            </div>
            <div className="content">
                <div className="rating">
                    <img src="star.svg" alt="star-icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>

                <span>⦿</span>
                <p className="lang">{original_language}</p>
                
                <span>⦿</span>
                <p className="date text-white">{release_date}</p>
                <span>⦿</span>
                <p className="overview text-white">{overview}</p>   
            </div>
            
        </div>
    );
}
export default MovieCard;