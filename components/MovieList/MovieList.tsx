// components/MovieList.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const MovieItem = styled.div`
  margin: 10px;
  text-align: center;
  cursor: pointer;

  img {
    width: 200px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
  }

  h3 {
    margin-top: 8px;
    font-size: 16px;
  }
`;

const MovieModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
`;

const WatchVideoButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: apiKey,
            language: "en-US",
            page: page,
          },
        }
      );

      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleMovieClick = async (movie: Movie) => {
    setSelectedMovie(movie);

    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        {
          params: {
            api_key: apiKey,
            language: "en-US",
          },
        }
      );

      const trailers = response.data.results.filter(
        (result: { type: string }) => result.type === "Trailer"
      );

      if (trailers.length > 0) {
        setVideoKey(trailers[0].key);
      } else {
        setVideoKey(null);
      }
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setVideoKey(null);
  };

  return (
    <div>
      <MovieContainer>
        {movies.map((movie) => (
          <MovieItem key={movie.id} onClick={() => handleMovieClick(movie)}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </MovieItem>
        ))}
      </MovieContainer>
      {selectedMovie && (
        <MovieModal onClick={closeModal}>
          <ModalContent>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.overview}</p>
            {videoKey && (
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoKey}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            <WatchVideoButton onClick={closeModal}>Fechar</WatchVideoButton>
          </ModalContent>
        </MovieModal>
      )}
      <LoadMoreButton onClick={handleLoadMore}>Carregar Mais</LoadMoreButton>
    </div>
  );
};

export default MovieList;
