import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./component/home/Home";
import Layout from './component/Layout';
import Header from "./component/header/Header";
import Trailer from "./component/trailer/Trailer"

function App() {

  const [movies, setMovies] = useState();

  const getMovies = async () => {

    try
    {

      const response = await api.get(); 

      console.log(response.data);

      setMovies(response.data);
    } 
    catch(err)
    {
      console.log(err);
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

        </Route>

      </Routes>

    </div>
  );
}

export default App;
