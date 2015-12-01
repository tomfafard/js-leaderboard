var sort_by = function(field, reverse, primer){

   var key = primer ?
       function(x) {return primer(x[field])} :
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
}


var gameInfo = function(){
  return [
   {
     home_team: "Patriots",
     away_team: "Broncos",
     home_score: 7,
     away_score: 3
   },
   {
     home_team: "Broncos",
     away_team: "Colts",
     home_score: 3,
     away_score: 0
   },
   {
     home_team: "Patriots",
     away_team: "Colts",
     home_score: 11,
     away_score: 7
   },
   {
     home_team: "Steelers",
     away_team: "Patriots",
     home_score: 7,
     away_score: 21
   }
 ];
};

// YOUR CODE HERE

var teamList = function(stats){

  var teams = [];

  for(var i = 0; i < stats.length; i++) {
      if(teams.indexOf(stats[i].home_team) != '-1') {
        if(teams.indexOf(stats[i].away_team) == '-1'){
          teams.push(stats[i].away_team);
        }
      } else {
        teams.push(stats[i].home_team);
        if(teams.indexOf(stats[i].away_team) == '-1') {
          teams.push(stats[i].away_team);
        }
      }
  }

  return teams;

};

var teamStats = function(listOfTeams) {

  var teamsWithStats = [];

  for(var i = 0; i < listOfTeams.length; i++) {
    teamsWithStats.push(
      {
      team: listOfTeams[i],
      wins: 0,
      losses: 0,
      rank: null
      }
    );
  }

  return teamsWithStats;

};

var addStatsToTeams = function(statsTemplate,gameStats) {

  var populatedStats = statsTemplate;

  for(var i = 0; i < gameStats.length; i++) {

    var ht = gameStats[i].home_team;
    var at = gameStats[i].away_team;
    var hs = gameStats[i].home_score;
    var as = gameStats[i].away_score;

    for(var index = 0; index < populatedStats.length; index++) {

      if(ht == populatedStats[index].team && hs > as) {
        populatedStats[index].wins += 1;
      } else if (at == populatedStats[index].team && as > hs) {
        populatedStats[index].wins += 1;
      } else if (ht == populatedStats[index].team && as > hs) {
        populatedStats[index].losses += 1;
      } else if (at == populatedStats[index].team && as < hs) {
        populatedStats[index].losses += 1;
      }

    }

  }

  populatedStats.sort(sort_by('wins', true, parseInt));

  for(var i = 0; i < populatedStats.length; i++){
    populatedStats[i].rank = (i + 1)
  }

  return populatedStats;

};

// console.log(gameInfo().length);
//
// console.log(teamList(gameInfo()));
//
// console.log(teamStats(teamList(gameInfo())));

// returns a populated hash of each team and their win/loss record

console.log(addStatsToTeams(teamStats(teamList(gameInfo())),gameInfo()));
