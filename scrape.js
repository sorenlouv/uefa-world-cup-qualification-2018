// http://www.bold.dk/fodbold/international/vm/2016-2017/

const json = Array.from(document.querySelectorAll('table.standing'))
  .slice(0, 9)
  .map(table => table.querySelectorAll('tr.data'))
  .map(rows => {
    return Array.from(rows).map((row, i) => {
      const cells = Array.from(row.querySelectorAll('td'));
      const [goalsFor, goalsAgainst] = cells[6].innerText
        .split('-')
        .map(g => parseInt(g, 10));
      return {
        pos: i + 1,
        logo: cells[0].querySelector('img').src,
        teamName: cells[1].innerText,
        matchesTotal: parseInt(cells[2].innerText, 10),
        wins: parseInt(cells[3].innerText, 10),
        draws: parseInt(cells[4].innerText, 10),
        defeats: parseInt(cells[5].innerText, 10),
        goalsFor,
        goalsAgainst,
        goalDiff: goalsFor - goalsAgainst,
        points: parseInt(cells[7].innerText, 10)
      };
    });
  });

Array.from(document.querySelectorAll('.roundlist')).map(round => {
  return Array.from(round.querySelectorAll('tr'))
    .slice(1)
    .map(match => {
      const [homeTeam, awayTeam] = match
        .querySelector('.name')
        .innerText.split(' – ');
      const [homeScore, awayScore] = match
        .querySelector('.score')
        .innerText.split(/([0-9]+)/)
        .map(c => parseInt(c, 10))
        .filter(c => !isNaN(c));
      return {
        homeTeam,
        awayTeam,
        homeScore,
        awayScore
      };
    });
});
