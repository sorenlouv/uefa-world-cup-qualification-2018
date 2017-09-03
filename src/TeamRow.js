import React from 'react';
import PropTypes from 'prop-types';
import { colors } from './styles';

import styled from 'styled-components';

const TableRow = styled.tr`
  background: ${props => {
    switch (props.pos) {
      case 1:
        return colors.green;
      case 2:
        return props.isLowestRunnerUp ? colors.redYellow : colors.yellow;
      case 3:
        return colors.red;
      default:
        return colors.white;
    }
  }};

  border-bottom: '1px solid #eee';
  td {
    padding: 0 10px;
  }
`;

export default function TeamRow({ team, isLowestRunnerUp }) {
  return (
    <TableRow pos={team.pos} isLowestRunnerUp={isLowestRunnerUp}>
      <td>
        <img src={team.logo} />
      </td>
      <td>{team.teamName}</td>
      <td>{team.matchesTotal}</td>
      <td>{team.wins}</td>
      <td>{team.draws}</td>
      <td>{team.defeats}</td>
      <td>
        {team.goalsFor} - {team.goalsAgainst}
      </td>
      <td>{team.points}</td>
      <td>{team.points2}</td>
    </TableRow>
  );
}

TeamRow.propTypes = {
  team: PropTypes.object.isRequired,
  isLowestRunnerUp: PropTypes.bool.isRequired
};
