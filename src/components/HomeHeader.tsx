import Navbar from './Navbar';
import HomeHeaderTitle from './HomeHeaderTitle';
import { useEffect, useState } from 'react';
import type { TMDBMovie } from '../types';
import { apiEndpoints, BACKDROP_BASE_URL, IMAGE_BASE_URL } from '../services/tmdb';

export default function HomeHeader() {
  const [trendingMovies, setTrendingMovies] = useState<TMDBMovie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch(apiEndpoints.trending)
      .then((response) => {
        if (!response.ok) throw new Error("مشکل در دریافت فیلم‌های ترند");
        return response.json();
      })
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setTrendingMovies(data.results.slice(0, 5));
        }
      })
      .catch((error) => console.error("Error fetching trending:", error));
  }, []);

  useEffect(() => {
    if (trendingMovies.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [trendingMovies.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + trendingMovies.length) % trendingMovies.length);
  };

  const currentMovie = trendingMovies[currentIndex];

  const prevIndex = (currentIndex - 1 + trendingMovies.length) % trendingMovies.length;
  const nextIndex = (currentIndex + 1) % trendingMovies.length;

  const prevMovie = trendingMovies[prevIndex];
  const nextMovie = trendingMovies[nextIndex];

  const headerStyle = currentMovie?.backdrop_path
    ? { backgroundImage: `url('${BACKDROP_BASE_URL}${currentMovie.backdrop_path}')` }
    : { backgroundColor: '#111111' };

  return (
    <div
      className="w-full h-250 bg-cover bg-center bg-no-repeat relative transition-all duration-1000"
      style={headerStyle}
    >
      <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-black/60 to-black/20"></div>

      <div className="relative z-10 h-full flex flex-col">
        <Navbar />

        {/* تغییرات در این بخش اعمال شد */}
        {currentMovie && (
          <HomeHeaderTitle
            id={currentMovie.id}
            title={currentMovie.title}
            overview={currentMovie.overview}
            onNext={handleNext}
            onPrev={handlePrev}
            prevImage={prevMovie?.poster_path ? `${IMAGE_BASE_URL}${prevMovie.poster_path}` : null}
            nextImage={nextMovie?.poster_path ? `${IMAGE_BASE_URL}${nextMovie.poster_path}` : null} />
        )}
      </div>
    </div>
  )
}