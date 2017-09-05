import _ from 'lodash';

export function getStandings(groups) {
  return _.orderBy(
    _.flatten(groups),
    ['pos', 'points', 'goalDiff', 'goalsFor'],
    ['asc', 'desc', 'desc', 'desc']
  );
}

function getBottomTeams(groups) {
  return _.flatten(groups)
    .filter(team => team.pos === 6)
    .map(({ teamName }) => teamName);
}

function getTeamDefaults(standings, teamName) {
  const team = standings.find(team => team.teamName === teamName);
  return {
    matchesTotal: 0,
    wins: 0,
    draws: 0,
    defeats: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    goalDiff: 0,
    pos: team.pos,
    logo: team.logo
  };
}

export function getStandingsExcludingBottomTeams(groups, rounds) {
  const standings = getStandings(groups);
  const bottomTeams = getBottomTeams(groups);
  const a = _.chain(rounds)
    .flatten()
    .filter(round => !_.isNil(round.homeScore))
    .filter(round => {
      const isBottomTeam =
        bottomTeams.includes(round.homeTeam) ||
        bottomTeams.includes(round.awayTeam);

      return !isBottomTeam;
    })
    .reduce((acc, { homeTeam, awayTeam, homeScore, awayScore }) => {
      const accHomeTeam = acc[homeTeam] || getTeamDefaults(standings, homeTeam);
      const accAwayTeam = acc[awayTeam] || getTeamDefaults(standings, awayTeam);

      const home = {
        matchesTotal: accHomeTeam.matchesTotal + 1,
        goalsFor: accHomeTeam.goalsFor + homeScore,
        goalsAgainst: accHomeTeam.goalsAgainst + awayScore,
        goalDiff: accHomeTeam.goalDiff + (homeScore - awayScore)
      };

      const away = {
        matchesTotal: accAwayTeam.matchesTotal + 1,
        goalsFor: accAwayTeam.goalsFor + awayScore,
        goalsAgainst: accAwayTeam.goalsAgainst + homeScore,
        goalDiff: accAwayTeam.goalDiff + (awayScore - homeScore)
      };

      if (homeScore > awayScore) {
        return {
          ...acc,
          [homeTeam]: {
            ...accHomeTeam,
            ...home,
            points: accHomeTeam.points + 3,
            wins: accHomeTeam.wins + 1
          },
          [awayTeam]: {
            ...accAwayTeam,
            ...away,
            defeats: accAwayTeam.defeats + 1
          }
        };
      } else if (homeScore < awayScore) {
        return {
          ...acc,
          [homeTeam]: {
            ...accHomeTeam,
            ...home,
            defeats: accHomeTeam.defeats + 1
          },
          [awayTeam]: {
            ...accAwayTeam,
            ...away,
            points: accAwayTeam.points + 3,
            wins: accAwayTeam.wins + 1
          }
        };
      } else {
        return {
          ...acc,
          [homeTeam]: {
            ...accHomeTeam,
            ...home,
            points: (accHomeTeam.points || 0) + 1,
            draws: (accHomeTeam.draws || 0) + 1
          },
          [awayTeam]: {
            ...accAwayTeam,
            ...away,
            points: (accAwayTeam.points || 0) + 1,
            draws: (accAwayTeam.draws || 0) + 1
          }
        };
      }
    }, {})
    .map((value, teamName) => {
      return {
        ...value,
        teamName
      };
    })
    .orderBy(['points', 'goalDiff', 'goalsFor'], ['desc', 'desc', 'desc'])
    .value();

  return a;
}

export function getLowestRunnerUp(groups, rounds) {
  const standingsExcludingBottomTeams = getStandingsExcludingBottomTeams(
    groups,
    rounds
  );

  return _.last(standingsExcludingBottomTeams.filter(team => team.pos === 2))
    .teamName;
}
