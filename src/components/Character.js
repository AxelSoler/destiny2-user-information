import PropTypes from 'prop-types';
import './Character.css';

const Character = (props) => {
  const { guardian } = props;
  const lastPlayed = new Date(guardian.dateLastPlayed).toString().slice(3, 15);
  return (
    <div className="flex flex-col items-center">
      <div className="flex text-2xl mb-4">
        <p className="text-success mr-2">
          { guardian.raceType === 0 && 'Human' }
          { guardian.raceType === 1 && 'Awoken' }
          { guardian.raceType === 2 && 'Exo' }
          {' '}
          { guardian.classType === 0 && 'Titan' }
          { guardian.classType === 1 && 'Hunter' }
          { guardian.classType === 2 && 'Warlock' }
        </p>
        <p className="text-warning ml-2">
          {guardian.light}
        </p>
      </div>
      <img className="emblem mb-4 ring-offset-2 ring-2" src={`https://www.bungie.net${guardian.emblemBackgroundPath}`} alt="console" />
      <div className="collapse border-primary rounded-box collapse-arrow ring-offset-2 ring-2 shadow-lg shadow-slate-500">
        <input type="checkbox" className="peer" />
        <div className="text-xl collapse-title bg-primary text-primary-content peer-checked:bg-primary-focus peer-checked:text-secondary-content">
          MAIN STATS
        </div>
        <div className="w-64 flex flex-col items-center collapse-content bg-primary text-primary-content peer-checked:bg-primary-focus peer-checked:text-secondary-content">
          <ul className="w-48">
            <li className="flex justify-between bg-primary p-1 rounded">
              <p>Mobility:</p>
              <p>{guardian.stats[2996146975]}</p>
            </li>
            <li className="flex justify-between p-1">
              <p>Resilience:</p>
              <p>{guardian.stats[392767087]}</p>
            </li>
            <li className="flex justify-between bg-primary p-1 rounded">
              <p>Recovery:</p>
              <p>{guardian.stats[1943323491]}</p>
            </li>
            <li className="flex justify-between p-1">
              <p>Discipline:</p>
              <p>{guardian.stats[1735777505]}</p>
            </li>
            <li className="flex justify-between bg-primary p-1 rounded">
              <p>Intellect:</p>
              <p>{guardian.stats[144602215]}</p>
            </li>
            <li className="flex justify-between p-1">
              <p>Strength:</p>
              <p>{guardian.stats[4244567218]}</p>
            </li>
            <li className="flex justify-between bg-primary p-1 rounded">
              <p>Total time:</p>
              <p>
                {guardian.minutesPlayedTotal}
                {' '}
                min
              </p>
            </li>
            <li className="flex justify-between p-1">
              <p>Last played:</p>
              <p>{lastPlayed}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Character.propTypes = {
  guardian: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Character;
