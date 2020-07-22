import PropTypes from 'prop-types';

const playerShape = PropTypes.shape({
  playerId: PropTypes.number,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  teamId: PropTypes.number,
});

export default { playerShape };
