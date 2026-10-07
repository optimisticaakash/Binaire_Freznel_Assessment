import React from "react";
import useLazyLoad from "../hooks/useLazyLoad";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { ref, isVisible } = useLazyLoad();
  const navigate = useNavigate();
  // console.log(movie.title, isVisible);
  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/agecheck/${movie.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/agecheck/${movie.id}`);
        }
      }}
      aria-label={`View details for ${movie.title}`}
      className="group cursor-pointer overflow-hidden bg-[#16202d] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
    >
      {isVisible ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="h-72 w-full bg-[#101822]" />
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>

        <p className="mt-2 text-sm text-gray-400">{movie.release_date}</p>

        <p className="mt-3 text-[#66c0f4]">
          {"\u2b50"} {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
