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
  const [searchResult, setSearchResult] = useState({}); 

  const sortMoviesByTitle = (data) => {
    const sortedList = [...data].sort((a, b) => a.movieName.localeCompare(b.movieName));
    console.log(sortedList);
    return sortedList; 
  }

  useEffect(() => {
    Axios.get(baseURL.concat("/get")).then((response) => {
      setMovieReviewList(sortMoviesByTitle(response.data));
    });
  }, []);

  const searchMovieByName = () => {
    movieReviewList.forEach((val) => {
      console.log(movieSearchName)
      console.log(val.movieName);
      if (val.movieName === movieSearchName) {
        setSearchResult(val);
        return;
      } 
    }
    );
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
    <h1>Movie Reviews</h1>

    <div className="form" >
      <input type="text" placeholder="Enter movie name" name="movieSearchName" onChange={(e)=>{
        setMovieSearchName(e.target.value)
      }}/>
    
      <button onClick = {searchMovieByName}> Search </button>
    </div>

    {searchResult.movieName == null && <p className="sorry-msg"> Sorry, could not find movie :(</p>}

    {searchResult.movieName != null && 
        <div className="movie-list">
          <div className="card">
            <h1> {searchResult.movieName} </h1>
            <p className="movie-review"> {searchResult.movieReview} </p>
          </div>  
        </div> 
    }

    <br></br>
    <br></br>


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

        <button type="submit" onClick={submitReview}> Add Review </button>
        
        <div className="movie-list">
          {movieReviewList.map((val) => {
            return (
              <div className="card">
                <h2> {val.movieName} </h2>
                <p className="movie-review"> {val.movieReview} </p>
                <div className="action-buttons">
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
                  <button
                    onClick={() => {
                      deleteReview(val.movieName);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
