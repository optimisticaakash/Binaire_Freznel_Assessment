import React from "react";

const AgeCheckContent = ({ movie }) => {
  return (
    <>
      <h1 className="mb-5 text-3xl font-bold text-white">{movie.title}</h1>

      {/* Movie Banner */}
      <div className="mx-auto mb-8 max-w-3xl overflow-hidden pt-2 shadow-lg">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          className="h-auto w-full object-contain"
        />
      </div>

      {/* Age Warning */}
      <h2 className="text-xl font-semibold leading-relaxed">
        This movie may contain content not appropriate for all ages,
        <br />
        or may not be appropriate for viewing at work.
      </h2>

      {/* Movie Overview */}
      <p className="mt-8 text-gray-400">Movie Overview</p>

      <p className="mt-2 text-lg text-gray-300">{movie.overview}</p>
    </>
  );
};

export default AgeCheckContent;
