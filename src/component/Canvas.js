import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Functional component based implementation
const Canvas = () => {
  const [photos, setPhotos] = useState([]);

  // state to capture each char user enters
  const [searchText, setSearchText] = useState("");
  
  // we want to call query the api only when user submits and not on every 
  // input char entered hence this state  holds the entire text, user has 
  // entered, just before submitting form
  // OR to avoid using 'query' state, 'axiosData' function call be called 
  // directly on submit button click
  const [query, setQuery] = useState("bentley");

  const [loading, setLoading] = useState(false);

  // to store any abrupt error while making api call
  const [error, setError] = useState(null);

  // To run an effect and clean it up only once (on mount and unmount),
  // you can pass an empty array ([]) as a second argument. This tells React
  // that your effect doesn’t depend on any values from props or state, so it
  // never needs to re-run. This isn’t handled as a special case — it follows
  // directly from how the dependencies array always works

  // By default, effects run after every completed render, but you can choose
  // to fire them only when certain values have changed

  // empty array [] tells react to run only when 
  // compomnent mounts(componentDidMount) and on unmount (componentDidUpdate)
  useEffect(() => {
    console.log("in use effect", query);
    axiosData();
  }, [query]) 

  const axiosData = async () => {
    setLoading(true);
    const url = 'https://api.unsplash.com/search/photos';
    const queryParam = query;
    try {
      const response = await axios.get(url, {
        params: { query: queryParam },
        headers: {
          Authorization: 'Client-ID e787ed18a7837c4aff0a5d75c9495c8d6ed977e46048f2b9a5015132afbd4b11'
        }
      });

      const receivedPics = response.data.results;
      console.log("DATA", receivedPics);
      setPhotos(receivedPics);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  const handleSearchSubmit = () => {
    setQuery(searchText);
  }

  const handleSearchInput = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  }

  // hasPics would be false on initial render only, after that it always has the 
  // previous state, so loader wouldnt be shown on query change. To show loader 
  // on every query update, use 'loading' state variable
  const hasPics = photos && photos.length;
  const spinner = 'https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif'; 

  return (
    <>
      <div className="xp__container grid isBound">
       
        <div className="col__12-12">
          <input id="search-text" placeholder="search" type="text" onChange={(e) => handleSearchInput(e)} />
          {searchText &&
              <button className="search-submit" type="button" onClick={handleSearchSubmit}>Submit</button> 
          }
          {!searchText &&
            <button className="search-submit" type="button" disabled>Submit</button>
          }   
          <p>Showing search results for <strong>{query}</strong></p>
        </div>
        <div className="col__12-12">
          <div className="xp__image">
            {hasPics &&
              photos.map(photo => (
                <div className="col__9-12" key={photo.id}>
                  <img
                    alt={photo.alt_description}
                    className="stretchy xp__image--size"
                    src={photo.urls.regular}
                  />
                </div>
              )
            )}
            {!hasPics && !error &&
              <img src={spinner} />
            }
            {error &&
              <p>An error has occured</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export { Canvas };
