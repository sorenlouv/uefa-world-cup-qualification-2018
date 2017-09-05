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
            Alle 9 gruppe vindere <Indicator color={colors.green} />{' '}
            kvalificerer sig direkte til VM. De 8 bedste toere{' '}
            <Indicator color={colors.yellow} /> går videre til play-offs.
            <br />
            Den lavest rangerede toer{' '}
            <Indicator color={colors.redYellowSmall} /> og alle andre{' '}
            <Indicator color={colors.white} /> ryger ud.
          </p>
        </div>
      </Container>
    );
  }
}

export default App;
