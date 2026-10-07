import React from "react";
import { useEffect, useState } from "react";
import { TMDBService } from "../api/tmdb";
import { PaginationManager } from "../utils/PaginationManager";
import Navbar from "../components/Navbar";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import CacheManager from "../utils/CacheManager";
import Footer from "../components/Footer";

const pagination = new PaginationManager();
const cache = new CacheManager();

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const service = new TMDBService(import.meta.env.VITE_TMDB_ACCESS_TOKEN);

        const data = await service.getTrendingMovies(currentPage);

        setMovies(data.results);
        setTotalPages(data.total_pages);

        cache.set(`movies-page-${currentPage}`, data);
      } catch (err) {
        const cachedData = cache.get(`movies-page-${currentPage}`);

        if (cachedData) {
          setMovies(cachedData.results);
          setTotalPages(cachedData.total_pages);
        } else {
          setMovies([]);
          setError("No cached data available for this page");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const handlePrevious = () => {
    const previousPage = pagination.previous();
    setCurrentPage(previousPage);
  };

  const handleNext = () => {
    const nextPage = pagination.next();
    setCurrentPage(nextPage);

  };
  const featuredMovie = movies[featuredIndex];
  return (
    <div className="page-transition min-h-screen bg-[#1b2838] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">
        {!loading && movies.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-5 text-2xl font-semibold">Featured Movie</h2>

            <div
              key={featuredMovie.id}
              className="featured-change relative overflow-hidden bg-[#16202d]"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
                alt={featuredMovie.title}
                className="h-[420px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#16202d] via-[#16202d]/20 to-transparent" />

              {/* Previous */}
              <button
                onClick={() =>
                  setFeaturedIndex(
                    (prev) => (prev - 1 + movies.length) % movies.length,
                  )
                }
                aria-label="Previous featured movie"
                className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-2xl text-white backdrop-blur-sm transition hover:bg-black/80 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
              >
                ←
              </button>

              {/* Next */}
              <button
                onClick={() =>
                  setFeaturedIndex((prev) => (prev + 1) % movies.length)
                }
                aria-label="Next featured movie"
                className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-2xl text-white backdrop-blur-sm transition hover:bg-black/80 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
              >
                →
              </button>

              {/* Movie Info */}
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-4xl font-bold text-white">
                  {featuredMovie.title}
                </h3>

                <p className="mt-2 text-sm text-gray-300">
                  Release Date: {featuredMovie.release_date}
                </p>

                <p className="mt-2 text-[#66c0f4]">
                  ⭐ {featuredMovie.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          </section>
        )}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured & Recommended</h2>

          <span className="text-sm text-gray-400">Trending Movies</span>
        </div>
        {error && <ErrorMessage message={error} />}
        {loading ? <Loading /> : <MovieGrid movies={movies} />}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
