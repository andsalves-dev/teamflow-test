import React, { useState, useEffect, useCallback } from 'react'
import './App.css';
import { Form } from 'react-bootstrap'
import fetchTrendingGifs from './requests/fetchTrendingGifs'
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchMatchingGifs from "./requests/fetchMatchingGifs";
import { debounce } from "debounce";
import GifModal from "./components/GifModal";

const SEARCH_DEBOUNCE = 500;

function App() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [matchingGifs, setMatchingGifs] = useState(null);
  const [selectedGif, setSelectedGif] = useState(null);

  useEffect(() => {
    fetchTrendingGifs().then(result => setTrendingGifs(mapResultToGif(result)))
  }, [])

  const performSearch = useCallback(event => {
    const search = event.target.value;

    if (!search) {
      setMatchingGifs(null);
      return;
    }

    fetchMatchingGifs(event.target.value).then(result => setMatchingGifs(mapResultToGif(result)));
  }, []);
  const performDebouncedSearch = debounce(performSearch, SEARCH_DEBOUNCE);

  const gifs = matchingGifs !== null ? matchingGifs : trendingGifs;

  const showModal = gif => setSelectedGif(gif);

  return (
    <div className="App">
      <Form.Row>
        <Form.Control size="lg" type="text" placeholder="Search" onChange={performDebouncedSearch} />
      </Form.Row>
      <div>
        {gifs.map(gif => (
          <button key={gif.id} onClick={() => showModal(gif)} className="btn-gif">
            <img src={gif.urlDownsized} alt={gif.title}></img>
          </button>
        ))}
      </div>
      <GifModal gif={selectedGif} onHide={() => setSelectedGif(null)} />
    </div>
  );
}

function mapResultToGif(result) {
  return result.data.map(item => ({
    urlDownsized: item.images.downsized.url,
    urlOriginal: item.images.original.url,
    title: item.title,
    id: item.id,
  }))
}

export default App;
