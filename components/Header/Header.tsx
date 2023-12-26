import React, { useState } from "react";
import {
  HeaderContainer,
  MoviePoster,
  MoviePosterContainer,
  ResultsContainer,
  ModalOverlay,
  ModalContent,
  CloseButton,
} from "./Header.style";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );
      const data = await response.json();

      setSearchResults(data.results);
    } catch (error) {
      console.error("Erro na pesquisa:", error);
    }
  };

  const handleMovieClick = async (result: any) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${result.id}/videos?api_key=${apiKey}`
      );
      const data = await response.json();

      const trailers = data.results.filter(
        (result: { type: string }) => result.type === "Trailer"
      );

      if (trailers.length > 0) {
        setVideoKey(trailers[0].key);
      } else {
        setVideoKey(null);
      }

      setSelectedMovie(result);
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setVideoKey(null);
  };

  return (
    <>
      <HeaderContainer>
        <h1>Movie App</h1>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Pesquisar filmes..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Pesquisar</button>
        </form>
      </HeaderContainer>

      {searchResults.length > 0 && (
        <ResultsContainer>
          <h2>Resultados da Pesquisa:</h2>
          <MoviePosterContainer>
            {searchResults.map((result) => (
              <MoviePoster
                key={result.id}
                onClick={() => handleMovieClick(result)}
              >
                {result.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                    alt="Movie Poster"
                  />
                )}
              </MoviePoster>
            ))}
          </MoviePosterContainer>
        </ResultsContainer>
      )}

      {selectedMovie && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>Fechar</CloseButton>
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
            <button onClick={closeModal}>Fechar</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Header;
