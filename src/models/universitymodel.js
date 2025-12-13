export default class Team {
  constructor(_id, name, sports =[], competitions = [], teams = [], players = [], matches, wins, losses, draws) {
    this._id = _id;
    this.name = name;
    this.sports = sports;
    this.competitions = competitions;
    this.teams = teams;
    this.players = players;
    this.matches = matches;
    this.wins = wins;
    this.losses = losses;
    this.draws = draws;
  }

  getFullName() {
    return this.name;
  }

  getSports() {
    if (Array.isArray(this.sports) && this.sports.length > 0) { 
        const sportsNames = this.sports.map(sports => {
            if (sports && sports.name) {
                return sports.name;
            }
            return 'Deporte Desconocido'; // Manejo de error si el objeto está incompleto
        });
        return sportsNames.join(', ');
    }
    return 'Sin deportes';
  }

  getCompetitions() {
    if (Array.isArray(this.competitions) && this.competitions.length > 0) { 
        const competitionsNames = this.competitions.map(competitions => {
            if (competitions && competitions.name) {
                return competitions.name;
            }
            console.log(competitions);
            return 'Competicion Desconocida'; // Manejo de error si el objeto está incompleto
        });
        return competitionsNames.join(', ');
    }
    return 'Sin competiciones';
  }

  getTeams() {
    if (Array.isArray(this.teams) && this.teams.length > 0) { 
        const teamNames = this.teams.map(teams => {
            if (teams && teams.name) {
                          console.log(teams);
              return teams.name;
            }
            return 'Equipo Desconocido'; // Manejo de error si el objeto está incompleto
        });
        return teamNames.join(', ');
    }
    return 'Sin equipos';
  }

  getPlayers() {
    if (Array.isArray(this.players) && this.players.length > 0) { 
        const playerNames = this.players.map(player => {
            if (player && player.name) {
                return player.name;
            }
            return 'Jugador Desconocido'; // Manejo de error si el objeto está incompleto
        });
        return playerNames.join(', ');
    }
    return 'Sin jugadores';
  }
  
  getMatches() {
    return this.matches;
  }
  getWins() {
    return this.wins;
  }
  getLosses() {
    return this.losses;
  }
  getDraws() {
    return this.draws;
  }
}