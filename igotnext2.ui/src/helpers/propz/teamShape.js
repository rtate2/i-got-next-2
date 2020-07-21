import PropTypes from 'prop-types';

const teamShape = PropTypes.shape({
  teamId: PropTypes.number,
  date: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  isTeamCountFull: PropTypes.bool.isRequired,
  courtId: PropTypes.number,
});

export default { teamShape };
