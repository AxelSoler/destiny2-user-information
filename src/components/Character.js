import PropTypes from 'prop-types';

const Character = (props) => {
  const { guardian } = props;
  return (
    <div>
      <img src={`https://www.bungie.net${guardian.emblemBackgroundPath}`} alt="console" />
      <p>
        Class:
        {' '}
        { guardian.classType === 0 && 'Titan' }
        { guardian.classType === 1 && 'Hunter' }
        { guardian.classType === 2 && 'Warlock' }
      </p>
      <p>
        Race:
        {' '}
        { guardian.raceType === 0 && 'Human' }
        { guardian.raceType === 1 && 'Awoken' }
        { guardian.raceType === 2 && 'Exo' }
      </p>
      <p>
        Character light:
        {' '}
        {guardian.light}
      </p>
      <p>
        Character id:
        {' '}
        {guardian.characterId}
      </p>
      <p>
        Last played:
        {' '}
        {guardian.dateLastPlayed}
      </p>
      <p>
        Time played:
        {' '}
        {guardian.minutesPlayedTotal}
        {' '}
        min
      </p>
      <ul>
        <li>
          Movilidad:
          {' '}
          {guardian.stats[2996146975]}
        </li>
        <li>
          Resistencia:
          {' '}
          {guardian.stats[392767087]}
        </li>
        <li>
          Recuperacion:
          {' '}
          {guardian.stats[1943323491]}
        </li>
        <li>
          Disciplina:
          {' '}
          {guardian.stats[1735777505]}
        </li>
        <li>
          Intelecto:
          {' '}
          {guardian.stats[144602215]}
        </li>
        <li>
          Fuerza:
          {' '}
          {guardian.stats[4244567218]}
        </li>
      </ul>
    </div>
  );
};

export default Character;

Character.propTypes = {
  guardian: PropTypes.objectOf(PropTypes.object()).isRequired,
};
