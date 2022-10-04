import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

const baseURL = "http://localhost:3001/api"; 

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [movieSearchName, setMovieSearchName] = useState("");
  const [movieFound, setMovieFound] = useState(true);
  const [searchResult, setSearchResult] = useState({}); 

  const sortMoviesByTitle = (data) => {
    const sortedList = [...data].sort((a, b) => {
      return a.movieName > b.movieName; 
    }); 
    return sortedList; 
  }

  useEffect(() => {
    Axios.get(baseURL.concat("/get")).then((response) => {
      setMovieReviewList(sortMoviesByTitle(response.data));
    });
  }, []);

  const searchMovieByName = () => {
    movieReviewList.forEach((val) => {
      if (val.movieName === movieSearchName) {
        setSearchResult(val);
        setMovieFound(true);
        return;
      }
    });
   };

  const submitReview = () => {
    Axios.post(baseURL.concat("/insert"), {
      movieName: movieName,
      movieReview: review,
    });

    setMovieReviewList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    console.log(movie); 
    Axios.delete(baseURL.concat(`/delete/${movie}`));
  };

  const updateReview = (movie) => {
    Axios.put(baseURL.concat("/update"), {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
    <div className="form">
      <label>
        Search for a movie:
      </label>
      <input type="text" name="movieSearchName" onChange={(e)=>{
        setMovieSearchName(e.target.value)
      }}/>
    
      <button onClick = {searchMovieByName}> Submit </button>
    </div>

    {!movieFound && <h2> Could not find movie :(</h2>}

    {searchResult.movieName != null && 
        <div className="card">
          <h1> {searchResult.movieName} </h1>
          <p> {searchResult.movieReview} </p>
        </div>   
    }

    <br></br>
    <br></br>


      <h1>Movie Reviews</h1>
      <div id="myForm" className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review:</label>
        <input
          type="text"
          name="Review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button type="submit" onClick={submitReview}> Submit </button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1> {val.movieName} </h1>
              <p> {val.movieReview} </p>

              <button
                onClick={() => {
                  deleteReview(val.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
