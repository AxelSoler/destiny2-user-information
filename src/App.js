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
  const [loading, setLoading] = useState(false);

  const getUserCharacters = async (memberType, memberId) => {
    const response = await axios({
      method: 'GET',
      baseURL: `${destinyCharacterURL}${memberType}/Profile/${memberId}/?components=200`,
      headers: {
        'X-API-Key': `${apiKey}`,
      },
    });
    setCharacters(response.data.Response.characters.data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const getUser = async (userName) => {
    setLoading(true);
    setCharacters({});
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
    e.target.reset();
    getUser(userName);
  };

  return (
    <div className="App flex flex-col items-center pt-12">
      <h1 className="text-5xl text-primary font-bold mb-6">ANOTHER DESTINY 2 WEBPAGE</h1>
      <form onSubmit={handleSubmit} className="form-control">
        <div className="label">
          <span className="label-text text-secondary">Search for a Guardian</span>
        </div>
        <label htmlFor="Search" className="input-group">
          <input onChange={onChange} type="text" placeholder="Guardian Name" className="input input-bordered input-primary w-full max-w-xs" />
          <button type="submit" className="btn btn-outline btn-secondary text-center text-sm font-semibold transition duration-200 ease-in-out hover:bg-gray-900">SEARCH</button>
        </label>
      </form>
      { loading ? (
        <div className="loader">
          <div className="spinner"> </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          { Object.keys(characters).length === 0 && (
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-info mt-12">Waiting for Guardians</h2>
              <h2 className="text-3xl font-bold text-info">. . .</h2>
            </div>
          )}
          { Object.keys(user).length !== 0 && (
            <section id="user" className="flex items-center m-10">
              <img className="consoleLogo" src={`https://www.bungie.net${user.iconPath}`} alt="console" />
              <h2 className="text-3xl">{user.bungieGlobalDisplayName}</h2>
            </section>
          )}
          { Object.keys(characters).length !== 0 && (
            <section id="characters">
              <h2 className="text-3xl font-bold text-info underline mb-8">CHARACTERS</h2>
              <ul className="flex flex-wrap gap-6 justify-center">
                {Object.keys(characters).map((character) => (
                  <li key={characters[character].characterId}>
                    <Character guardian={characters[character]} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
