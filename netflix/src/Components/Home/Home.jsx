import React, { useState } from 'react'
import "./Home.scss"
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';

const api_Key = "fd1b0f53c0c63f84e7b260d86cd386ae";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const popular = "popular";
const nowPlaying = "now_playing";
const topRated = "top_rated";

const Card = ({ img }) => (
  <img className='card' src={img} alt="cover" />
)

const Row = ({ title, arr = [] }) => (
  <div className='row'>
    <h2>{title}</h2>

    <div>
      {
        arr.map((item, index) => (
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        ))
      }
    </div>
  </div>
)

const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [movieGenre, setMovieGenre] = useState([]);

  useEffect(() => {

    const fetchUpcoming = async () => {
      const { data: { results }, } = await axios.get(`${url}/movie/${upcoming}?api_key=${api_Key}`)
      setUpcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const { data: { results }, } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${api_Key}`)
      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
      const { data: { results }, } = await axios.get(`${url}/movie/${popular}?api_key=${api_Key}`)
      setPopularMovies(results);
    };

    const fetchTopRated = async () => {
      const { data: { results }, } = await axios.get(`${url}/movie/${topRated}?api_key=${api_Key}`)
      setTopRatedMovies(results);
    };

    const fetchGenre = async () => {
      const { data: { genres }, } = await axios.get(`${url}/genre/movie/list?api_key=${api_Key}`)
      setMovieGenre(genres);
      console.log(genres)
    };

    fetchUpcoming()
    fetchNowPlaying()
    fetchPopular()
    fetchTopRated()
    fetchGenre()
  }, [])


  return (
    <section className='home'>
      <div className="banner" style={{
        backgroundImage: popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` : "rgb(10,10,10)",
      }} >

        {
          popularMovies[0] && ( <h1>{popularMovies[0].original_title}</h1>  )
        }
        {
          popularMovies[0] && ( <p>{popularMovies[0].overview}</p>  )
        }

        <div>
          <button><BiPlay />Play</button>
          <button>My List<AiOutlinePlus /></button>
        </div>

      </div>

      <Row title={"Popular on Netflix"} arr={popularMovies} />
      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      <Row title={"Genre"} />

      <div className='genreBox'>
        {
          movieGenre.map((item) => (
            <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
          ))
        }
      </div>

    </section>
  )
}

export default Home;