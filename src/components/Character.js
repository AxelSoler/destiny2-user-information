import PropTypes from 'prop-types';
import './Character.css';

const Character = (props) => {
  const { guardian } = props;
  const lastPlayed = new Date(guardian.dateLastPlayed).toString().slice(3, 15);
  return (
    <div className="flex flex-col items-center">
      <div className="flex text-xl mb-4">
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
      <img className="emblem mb-4" src={`https://www.bungie.net${guardian.emblemBackgroundPath}`} alt="console" />
      <ul className="w-3/4">
        <li className="flex justify-between">
          <p>Movilidad:</p>
          <p>{guardian.stats[2996146975]}</p>
        </li>
        <li className="flex justify-between">
          <p>Resistencia:</p>
          <p>{guardian.stats[392767087]}</p>
        </li>
        <li className="flex justify-between">
          <p>Recuperacion::</p>
          <p>{guardian.stats[1943323491]}</p>
        </li>
        <li className="flex justify-between">
          <p>Disciplina:</p>
          <p>{guardian.stats[1735777505]}</p>
        </li>
        <li className="flex justify-between">
          <p>Intelecto:</p>
          <p>{guardian.stats[144602215]}</p>
        </li>
        <li className="flex justify-between">
          <p>Fuerza:</p>
          <p>{guardian.stats[4244567218]}</p>
        </li>
        <li className="flex justify-between">
          <p>Total time:</p>
          <p>
            {guardian.minutesPlayedTotal}
            {' '}
            min
          </p>
        </li>
        <li className="flex justify-between">
          <p>Last played:</p>
          <p>{lastPlayed}</p>
        </li>
      </ul>
    </div>
  );
};

Character.propTypes = {
  guardian: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Character;
