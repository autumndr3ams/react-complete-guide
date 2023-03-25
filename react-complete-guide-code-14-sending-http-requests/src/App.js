import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = useCallback(async()=>{
    setIsLoading(true)
    setError(null)
    try{
      const response = await fetch('https://swapi.dev/api/films/')
      
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      
      const data = await response.json();
      const transformedMovies = data.results.map(movie=>{
        return{
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date
        }
      })
      setMovies(transformedMovies);
    } catch(error){
      setError(error.message)
    }
    setIsLoading(false)
    }, [])

    useEffect(()=>{
      // 컴포넌트가 최초 로딩 될 때 함수 실행
      fetchMoviesHandler()
    }, [fetchMoviesHandler]);
    
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading &&  'Loading...'}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
