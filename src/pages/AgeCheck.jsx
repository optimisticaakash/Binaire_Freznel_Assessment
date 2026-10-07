import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AgeCheckContent from "../components/AgeCheckContent";
import BirthDateForm from "../components/BirthDateForm";
import AgeCheckActions from "../components/AgeCheckActions";
import CacheManager from "../utils/CacheManager";

const cache = new CacheManager();
const AgeCheck = () => {
  const { movieId } = useParams();
  const selectedMovieId = movieId || "27205";
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2026");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovieId}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }

        const data = await response.json();

        setMovie(data);
        cache.set(`movie-${selectedMovieId}`, data);
      } catch (error) {
        const cachedMovie = cache.get(`movie-${selectedMovieId}`);

        if (cachedMovie) {
          setMovie(cachedMovie);
        } else {
          setMovie(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [selectedMovieId]);

  const handleViewPage = () => {
    console.log("Birth Date:", day, month, year);
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="page-transition min-h-screen bg-[#1b2838] text-white">
      <Navbar />

      {/* Age Check */}
      <main className="mx-auto max-w-6xl px-6 py-16">
        <section
          id="age-check"
          className="border border-[#435466] px-10 py-10 text-center target:border-[#66c0f4] target:ring-2 target:ring-[#66c0f4]"
        >
          <div className="mx-auto max-w-3xl">
            {loading ? (
              <p className="py-20 text-xl text-gray-400">Loading movie...</p>
            ) : movie ? (
              <>
                <AgeCheckContent movie={movie} />

                {/* Birth Date */}
                <BirthDateForm
                  day={day}
                  setDay={setDay}
                  month={month}
                  setMonth={setMonth}
                  year={year}
                  setYear={setYear}
                />

                {/* Buttons */}
                <AgeCheckActions
                  handleViewPage={handleViewPage}
                  handleCancel={handleCancel}
                />
              </>
            ) : (
              <p className="py-20 text-xl text-red-400">Movie not found.</p>
            )}
          </div>
        </section>

        <p className="mt-12 text-center text-sm text-gray-400">
          This data is for verification purposes only and will not be stored.
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AgeCheck;
