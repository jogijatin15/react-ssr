import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Functional component based implementation
const Canvas = () => {
  const [photos, setPhotos] = useState([]);

  // To run an effect and clean it up only once (on mount and unmount),
  // you can pass an empty array ([]) as a second argument. This tells React
  // that your effect doesn’t depend on any values from props or state, so it
  // never needs to re-run. This isn’t handled as a special case — it follows
  // directly from how the dependencies array always works
  useEffect(() => {
    console.log("in use effect");
    axiosData();
  }, [])

  const axiosData = async () => {
    const url = 'https://api.unsplash.com/search/photos';
    const response = await axios.get(url, {
      params: { query: 'bmw' },
      headers: {
        Authorization: 'Client-ID e787ed18a7837c4aff0a5d75c9495c8d6ed977e46048f2b9a5015132afbd4b11'
      }
    });

    const receivedPics = response.data.results;
    console.log("DATA", receivedPics);
    setPhotos(receivedPics);
  }

  const hasPics = photos && photos.length;
  const spinner = 'https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif';

  return (
    <>
      <div className="xp__container grid isBound">
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
            {!hasPics &&
              <img src={spinner} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export { Canvas };