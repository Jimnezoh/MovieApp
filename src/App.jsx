import {useEffect, useState } from 'react'
import { useDebounce } from 'react-use';
import Search from './components/search';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY  = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
const App = () =>{
  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState([]);
  const [Movies, setMovies] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');


  // prevents the search term from making too many API request that cause overload in the server.
  
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : /* this line makes sure that the search query gets displayed*/
      `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;  /*this line makes sure movies are fetched from the movie database and displayed in a descending order*/
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if(data.response === 'False'){
        setErrorMessage(data.error || 'Failed to fetch movies')
        setMovies([]);
        return;
      
      }
      setMovies(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies:, ${error}`);
      setErrorMessage('Error fetching movies. Please try again later');
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(()=>{
   fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])
  return(
    <main>
      <div className="pattern"/>
    <div className="wrapper">
<header>
  <img src="/hero.png" alt="hero picture" />
  <h1>Find <span className="text-gradient">Movies</span> you will enjoy without the Hassle</h1>


  <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

</header>
<section className='all-movies'> 
  <h2 className='mt-[30px]'>All Movies</h2>
  {isloading ? (
  <p className='text-white'>Loading...</p>
) : errorMessage ? (
  <p className='text-red-500'>{errorMessage}</p>
) : (
  <ul>
    {Movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie}/> 
    ))}
  </ul>
)}

  {/* {errorMessage && <p className='text-red-500'>{errorMessage}</p>} */}
</section>

    </div>
    </main>
  )
}


export default App
