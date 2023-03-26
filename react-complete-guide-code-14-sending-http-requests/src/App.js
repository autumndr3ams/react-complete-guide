import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = useCallback(async()=>{
    setIsLoading(true)
    setError(null)
    try{
      const response = await fetch('https://react-udemy-9e79f-default-rtdb.firebaseio.com/movies.json')
      
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      
      const data = await response.json();
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch(error){
      setError(error.message)
    }
    setIsLoading(false)
    }, [])

  useEffect(()=>{
    // 컴포넌트가 최초 로딩 될 때 함수 실행
    fetchMoviesHandler()
  }, [fetchMoviesHandler]);
  
  
  async function addMovieHandler(movie){
    const response = await fetch('https://react-udemy-9e79f-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
