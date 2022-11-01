import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const destinyCharacterURL = 'https://www.bungie.net/Platform/Destiny2/2/Profile/4611686018431622644/?components=200';
const apiKey = '96e8ddde744f4a17bc7f2337f87cb563';

function App() {
  const [characters, setCharacters] = useState({});
  useEffect(() => {
    getUserCharacters()
  },[]);
  const getUserCharacters = async () => {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: destinyCharacterURL,
        headers: {
          'X-API-Key': apiKey,
      },
    })
      console.log(response);
      setCharacters(response.data.Response.characters.data);
    } catch (error) {
      console.error(error);
    }
  };

  if(characters.length === 0) {
    return <h1>there are no characters</h1>
  }

  return (
    <div className="App">
      <h1>Destiny2</h1>
      {console.log(characters)}
      {Object.keys(characters).map((character, i) => (
          <li key={i}>{characters[character].characterId}</li>
      ))
      }
    </div>
  );
}

export default App;
