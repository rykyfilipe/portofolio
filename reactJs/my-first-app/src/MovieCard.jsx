import React from "react";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie">
            <div className="movie-year">
                <p>{movie.Year}</p>
            </div>

            <div className="movie-poster">
                <img 
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
}
                    alt={movie.Title}
                />
            </div>

            <div className="movie-info">
                <span>{movie.Type}</span>
                <h3 role="heading">{movie.Title}</h3>
            </div>
        </div>
    );
}

export default MovieCard;
