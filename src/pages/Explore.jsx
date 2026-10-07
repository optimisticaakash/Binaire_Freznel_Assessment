import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { TMDBService } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import { PaginationManager } from "../utils/PaginationManager";
import Pagination from "../components/Pagination";
import CacheManager from "../utils/CacheManager";
import ErrorMessage from "../components/ErrorMessage";

const pagination = new PaginationManager();
const cache = new CacheManager();
const Explore = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const handlePrevious = () => {
    const page = pagination.previous();
    setCurrentPage(page);
  };

  const handleNext = () => {
    const page = pagination.next();
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const service = new TMDBService(import.meta.env.VITE_TMDB_ACCESS_TOKEN);

        const data = await service.getNewMovies(currentPage);

        setMovies(data.results);
        setTotalPages(data.total_pages);

        cache.set(`new-movies-page-${currentPage}`, data);
      } catch (error) {
        const cachedData = cache.get(`new-movies-page-${currentPage}`);

        if (cachedData) {
          setMovies(cachedData.results);
          setTotalPages(cachedData.total_pages);
        } else {
          setMovies([]);
          setError(
            "Unable to load movies. Please check your internet connection or try again later.",
          );
        }

        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);
  return (
    <div className="page-transition min-h-screen bg-[#1b2838] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-semibold">New Releases</h1>

        <div className="mt-8 border border-[#435466] p-8">
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieGrid movies={movies} />
          )}
        </div>
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

export default Explore;
