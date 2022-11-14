import { useState } from 'react';
import axios from 'axios';
import './App.css';

const destinyCharacterURL = 'https://www.bungie.net/Platform/Destiny2/';
const destinyUserURL = 'https://www.bungie.net/Platform/User/Search/Prefix/';
const apiKey = '96e8ddde744f4a17bc7f2337f87cb563';

const App = () => {
  const [characters, setCharacters] = useState({});
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('');
  const getUserCharacters = async (memberType, memberId) => {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: `${destinyCharacterURL}${memberType}/Profile/${memberId}/?components=200`,
        headers: {
          'X-API-Key': apiKey,
        },
      });
      setCharacters(response.data.Response.characters.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getUser = async (userName) => {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: `${destinyUserURL}${userName}/-1`,
        headers: {
          'X-API-Key': apiKey,
        },
      });
      setUser(response.data.Response.searchResults[0].destinyMemberships[0]);
      const userType = response.data.Response.searchResults[0].destinyMemberships[0].membershipType;
      const userId = response.data.Response.searchResults[0].destinyMemberships[0].membershipId;
      getUserCharacters(userType, userId);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getUser(userName);
  };

  if (characters.length === 0 && user.length === 0) {
    return <h1>there are no characters</h1>;
  }

  return (
    <div className="App">
      <h1>Destiny2</h1>
      <form onSubmit={handleSubmit}>
        <h2>Search a guardian</h2>
        <input onChange={onChange} type="text" placeholder="Guardian Name" />
        <button type="submit">SEARCH</button>
      </form>
      <h2>USER</h2>
      <img src={`https://www.bungie.net${user.iconPath}`} alt="console" />
      <p>
        Bungie name:
        {user.bungieGlobalDisplayName}
      </p>
      <p>
        membership id:
        {user.membershipId}
      </p>
      <p>
        membershipType:
        {user.membershipType}
      </p>
      <h2>CHARACTERS</h2>
      <ul>
        {Object.keys(characters).map((character) => (
          <li key={characters[character].characterId}>
            <div>
              <img src={`https://www.bungie.net${characters[character].emblemBackgroundPath}`} alt="console" />
              <p>
                Class:
                {' '}
                {characters[character].classType}
              </p>
              <p>
                Race:
                {' '}
                {characters[character].raceType}
              </p>
              <p>
                Character light:
                {' '}
                {characters[character].light}
              </p>
              <p>
                Character id:
                {' '}
                {characters[character].characterId}
              </p>
              <p>
                Last played:
                {' '}
                {characters[character].dateLastPlayed}
              </p>
              <p>
                Time played:
                {' '}
                {characters[character].minutesPlayedTotal}
                {' '}
                min
              </p>
              <ul>
                <li>
                  Movilidad:
                  {' '}
                  {characters[character].stats[2996146975]}
                </li>
                <li>
                  Resistencia:
                  {' '}
                  {characters[character].stats[392767087]}
                </li>
                <li>
                  Recuperacion:
                  {' '}
                  {characters[character].stats[1943323491]}
                </li>
                <li>
                  Disciplina:
                  {' '}
                  {characters[character].stats[1735777505]}
                </li>
                <li>
                  Intelecto:
                  {' '}
                  {characters[character].stats[144602215]}
                </li>
                <li>
                  Fuerza:
                  {' '}
                  {characters[character].stats[4244567218]}
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
