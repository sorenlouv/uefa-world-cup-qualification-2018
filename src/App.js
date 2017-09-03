import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import TeamTable from './TeamTable';
import groups from './mocks/groups.json';
import rounds from './mocks/rounds.json';
import Legends, { Indicator } from './Legends';
import { colors } from './styles';

const Container = styled.div`display: flex;`;

class App extends Component {
  render() {
    const bottomTeams = _.flatten(groups)
      .filter(team => team.pos === 6)
      .map(({ teamName }) => teamName);

    const results = _.flatten(rounds)
      .filter(round => !_.isNil(round.homeScore))
      .filter(round => {
        const isBottomTeam =
          bottomTeams.includes(round.homeTeam) ||
          bottomTeams.includes(round.awayTeam);

        return !isBottomTeam;
      })
      .reduce((acc, { homeTeam, awayTeam, homeScore, awayScore }) => {
        if (homeScore > awayScore) {
          return { ...acc, [homeTeam]: (acc[homeTeam] || 0) + 3 };
        } else if (homeScore < awayScore) {
          return { ...acc, [awayTeam]: (acc[awayTeam] || 0) + 3 };
        } else {
          return {
            ...acc,
            [awayTeam]: (acc[awayTeam] || 0) + 1,
            [homeTeam]: (acc[homeTeam] || 0) + 1
          };
        }
      }, {});

    const teams = _.chain(groups)
      .flatten()
      .map(team => ({
        ...team,
        points2: results[team.teamName] || 0
      }))
      .orderBy(
        ['points2', 'pos', 'points', 'goalDiff', 'goalsFor'],
        ['desc', 'asc', 'desc', 'desc', 'desc']
      )
      .value();

    const runnerUpStandings = _.orderBy(
      _.map(results, (points, teamName) => ({
        teamName,
        points
      })),
      'points',
      'desc'
    );

    const runnersUp = teams
      .filter(team => team.pos === 2)
      .map(({ teamName }) => teamName);

    const lowestRankedSecond = runnerUpStandings.filter(({ teamName }) =>
      runnersUp.includes(teamName)
    )[8].teamName;

    return (
      <Container>
        <TeamTable teams={teams} lowestRankedSecond={lowestRankedSecond} />
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
