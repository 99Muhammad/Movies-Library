'use strict'

const express=require("express");
const cors=require("cors");
const axios=require("axios").default;
require('dotenv').config();
const api_key=process.env.Key_api;
const movieData=require("./data.json");


const app=express();
app.use(cors());
const port =3000;

app.get("/trending",handleTrending);

function handleTrending(req, res) 
{
  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}&language=en-US`;

  axios.get(url)   
    .then(result => {
      // console.log(result);
      let trend = result.data.results.map(tre => {
        return new Trending(tre.id,tre.title, tre.release_date, tre.poster_path, tre.overview);
    })
    res.json(trend);
     res.send("Inside then");
    })
    .catch((error) => {
      console.log(error);
      res.send("Inside catch")

    });
}
//d7d016828d4678b584f316e8d04c699c
app.get("/Search",handleSearchMovie);


function handleSearchMovie(req,res)
{
  // console.log(req.query);
  let movieName=req.query.query;
  let url=`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${api_key}&language=en-US`;
  axios.get(url)
  .then((result=>
    {
      res.json(result.data.results)
    }
  ))
  .catch((error) => {
    console.log(error);
    res.send("Inside catch")

  });

}

app.get("/TopRated",handleTopRated);


function handleTopRated(req,res)
{
  // console.log(req.query);
  let movieName=req.query.query;
  let url=`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
  axios.get(url)
  .then((result=>
    {
      res.json(result.data.results)
    }
  ))
  .catch((error) => {
    console.log(error);
    res.send("Inside catch")

  });

}

app.get("/Popular",handlePopular);


function handlePopular(req,res)
{
  // console.log(req.query);
  let movieName=req.query.query;
  let url=`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'`;
  axios.get(url)
  .then((result=>
    {
      res.json(result.data.results)
    }
  ))
  .catch((error) => {
    console.log(error);
    res.send("Inside catch")

  });

}

app.get("/",handleHomePage);

function handleHomePage(req,res)
{
// console.log(movieData);
    res.json(new MovieLibrary(movieData.title,movieData.poster_path,movieData.overview));
}

app.get("/favorite",handleFavoritePage);

function handleFavoritePage(req,res)
{
    res.send("Welcome to Favorite Page");
}
// Server error handler
function handleServerError(err, req, res, next) {
    console.error(err); 
  
    const errorResponse = {
      status: 500,
      responseText: "Sorry, something went wrong"
    };
  
    res.status(500).json(errorResponse);
  }
  
  
  function handlePageNotFoundError(req, res) {
    const errorResponse = {
      status: 404,
      responseText: "Page not found"
    };
  
    res.status(404).json(errorResponse);
  }
  
  // Register the error handlers
  app.use(handleServerError);
  app.use(handlePageNotFoundError);

app.listen(port,handleListen);
function handleListen()
{
    console.log(`app listening on port ${port}`);
}
let movielib=[];

function MovieLibrary(title,poster,overview)
{
   this.title=title;
   this.port=poster;
   this.overview=overview;

    // movielib.push(this);
    
}

function Trending(id,title,release_date,poster_path,overview)
{
  this.id=id;
  this.title=title;
  this.release_date=release_date;
  this.poster_path=poster_path;
  this.overview=overview;
}


