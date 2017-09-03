import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TeamRow from './TeamRow';

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  margin-right: 15px;
`;

export default function TeamTable({ standings, lowestRunnerUp }) {
  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th>Land</th>
          <th>K</th>
          <th>V</th>
          <th>U</th>
          <th>T</th>
          <th>M</th>
          <th>P</th>
        </tr>
      </thead>
      <tbody>
        {standings.map(team => (
          <TeamRow
            key={team.teamName}
            team={team}
            isLowestRunnerUp={team.teamName === lowestRunnerUp}
          />
        ))}
      </tbody>
    </Table>
  );
}

TeamTable.propTypes = {
  standings: PropTypes.array.isRequired,
  lowestRunnerUp: PropTypes.string.isRequired
};
