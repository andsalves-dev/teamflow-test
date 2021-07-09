import { API_KEY } from "../constants";

const fetchMatchingGifs = q => {
  return fetch(`https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${q}`)
    .then(response => response.json())
}

export default fetchMatchingGifs
