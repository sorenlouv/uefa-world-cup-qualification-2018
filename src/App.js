import React, { Component } from 'react';

import styled from 'styled-components';
import TeamTable from './TeamTable';
import groups from './mocks/groups.json';
import rounds from './mocks/rounds.json';
import {
  getLowestRunnerUp,
  getStandingsExcludingBottomTeams,
  getStandings
} from './utils';
import Legends, { Indicator } from './Legends';
import { colors } from './styles';

const Container = styled.div`display: flex;`;

class App extends Component {
  render() {
    const standings = getStandings(groups);

    const standingsExcludingBottomTeams = getStandingsExcludingBottomTeams(
      groups,
      rounds
    );
    const lowestRunnerUp = getLowestRunnerUp(groups, rounds);
    return (
      <Container>
        <TeamTable
          standings={standingsExcludingBottomTeams}
          lowestRunnerUp={lowestRunnerUp}
        />
        <div>
          <Legends />

          <p>
            All 9 group winners <Indicator color={colors.green} /> will proceed
            directly to the world cup, and the 8 best runners-up{' '}
            <Indicator color={colors.yellow} /> go into the play-offs.
            <br />
            The lowest ranked number 2{' '}
            <Indicator color={colors.redYellowSmall} /> and everybody else{' '}
            <Indicator color={colors.white} /> will not proceed to the World
            Cup.
          </p>
        </div>
      </Container>
    );
  }
}

export default App;
