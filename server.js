'use strict'

const express=require("express");
const movieData=require("./data.json");


const app=express();
const port =3000;

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
    console.error(err); // Log the error for debugging purposes
  
    const errorResponse = {
      status: 500,
      responseText: "Sorry, something went wrong"
    };
  
    res.status(500).json(errorResponse);
  }
  
  // Page not found error handler
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



