import { API_KEY } from "../constants";

const fetchTrendingGifs = () => {
  return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`).then(response => response.json())
}

export default fetchTrendingGifs
