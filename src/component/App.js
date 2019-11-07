import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    photos: []
  }

  componentDidMount = () => {
    this.axiosData();
  }

  fetchData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/photos';
    const { data = [] } = await axios.get(url);
    const pics = data.slice(0,10);
    this.setState({
      photos: pics
    });
  }

  axiosData = async () => {
    const url = 'https://api.unsplash.com/search/photos';
    const response = await axios.get(url, {
      params: { query: 'ferrari' },
      headers: {
        Authorization: 'Client-ID e787ed18a7837c4aff0a5d75c9495c8d6ed977e46048f2b9a5015132afbd4b11'
      }
    });

    console.log("DATA", response.data.results);
    this.setState({
      photos: response.data.results
    });
  }

  render() {
    const { photos = [] } = this.state;
    const hasPics = photos && photos.length;
    const spinner = 'https://loading.io/spinners/spinner/lg.ajax-spinner-preloader.gif';

    return (
      <Fragment>
        <div className="xp__container grid isBound">
          <div className="col__12-12">
            <div className="xp__image">
              {
                hasPics
                ? photos.map(photo => (
                    <div className="col__9-12" key={photo.id}>
                      <img className="stretchy xp__image--size" src={photo.urls.regular} alt={photo.alt_description} />
                    </div>
                  )
                )
                :
                (
                  <img src="https://loading.io/spinners/spinner/lg.ajax-spinner-preloader.gif" />
                )

              }
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App;
