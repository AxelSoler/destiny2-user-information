import { useState } from 'react';
import axios from 'axios';
import Character from './components/Character';

const destinyCharacterURL = process.env.REACT_APP_DESTINY_CHARACTER_URL;
const destinyUserURL = process.env.REACT_APP_DESTINY_USER_URL;
const apiKey = process.env.REACT_APP_DESTINY_API_KEY;

const App = () => {
  const [characters, setCharacters] = useState({});
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('');
  const getUserCharacters = async (memberType, memberId) => {
    const response = await axios({
      method: 'GET',
      baseURL: `${destinyCharacterURL}${memberType}/Profile/${memberId}/?components=200`,
      headers: {
        'X-API-Key': `${apiKey}`,
      },
    });
    setCharacters(response.data.Response.characters.data);
  };
  const getUser = async (userName) => {
    const response = await axios({
      method: 'GET',
      baseURL: `${destinyUserURL}${userName}/-1`,
      headers: {
        'X-API-Key': `${apiKey}`,
      },
    });
    setUser(response.data.Response.searchResults[0].destinyMemberships[0]);
    const userType = response.data.Response.searchResults[0].destinyMemberships[0].membershipType;
    const userId = response.data.Response.searchResults[0].destinyMemberships[0].membershipId;
    getUserCharacters(userType, userId);
  };

  const onChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getUser(userName);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Destiny2</h1>
      <form onSubmit={handleSubmit}>
        <h2>Search for a Guardian</h2>
        <input onChange={onChange} type="text" placeholder="Guardian Name" />
        <button type="submit" className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">SEARCH</button>
      </form>
      { Object.keys(user).length !== 0 && (
        <section id="user">
          <h2>USER</h2>
          <div className="user">
            <img className="consoleLogo" src={`https://www.bungie.net${user.iconPath}`} alt="console" />
            <h3>{user.bungieGlobalDisplayName}</h3>
          </div>
          <p>
            membership id:
            {user.membershipId}
          </p>
          <p>
            membershipType:
            {user.membershipType}
          </p>
        </section>
      )}
      { Object.keys(characters).length === 0 && <h2>Waiting for Guardians ...</h2> }
      { Object.keys(characters).length !== 0 && (
        <section id="characters">
          <h2>CHARACTERS</h2>
          <ul className="charactersUl">
            {Object.keys(characters).map((character) => (
              <li key={characters[character].characterId}>
                <Character guardian={characters[character]} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default App;
