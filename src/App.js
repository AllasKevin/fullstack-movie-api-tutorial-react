import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./component/home/Home";
import Layout from './component/Layout';
import Header from "./component/header/Header";
import Trailer from "./component/trailer/Trailer"
import Reviews from './component/review/Reviews';
import NotFound from './component/notFound/NotFound';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try
    {
      const response = await api.get("/movies"); 

      console.log(response.data);

      setMovies(response.data);
    } 
    catch(err)
    {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try
    {
      const response = await api.get(`/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviewIds);

    }
    catch (error)
    {
      console.error(error);
    }
  }

  useEffect(() =>{
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home movies={movies}/>}></Route>
          {/*<Route path="/watchList" element={<div>WAAAAAAAAATCH LIIIIIIIIIST</div>}></Route>*/}
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
          <Route path="*" element = {<NotFound/>}></Route>
        </Route>

      </Routes>

    </div>
  );
}

export default App;
