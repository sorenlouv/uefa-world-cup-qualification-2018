import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TeamRow from './TeamRow';

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  margin-right: 15px;
`;

export default function TeamTable({ teams, lowestRankedSecond }) {
  return (
    <Table>
      <thead>
        <th />
        <th>Land</th>
        <th>K</th>
        <th>V</th>
        <th>U</th>
        <th>T</th>
        <th>M</th>
        <th>P</th>
        <th>P2</th>
      </thead>
      <tbody>
        {teams.map(team => (
          <TeamRow
            key={team.teamName}
            team={team}
            isLowestRankedSecond={team.teamName === lowestRankedSecond}
          />
        ))}
      </tbody>
    </Table>
  );
}

TeamTable.propTypes = {
  teams: PropTypes.array.isRequired,
  lowestRankedSecond: PropTypes.string.isRequired
};
