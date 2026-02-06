export default class Team {
  constructor(_id, name, university, competition, captain, players = [], matches, wins, loses, draws) {
    this._id = _id;
    this.name = name;
    this.university = university;
    this.competition = competition;
    this.captain = captain;
    this.players = players;
    this.matches = matches;
    this.wins = wins;
    this.loses = loses;
    this.draws = draws;
  }

  getFullName() {
    return this.name;
  }
  getUniversity() {
    if (this.university && typeof this.university === 'object' && this.university.name) {
      return this.university.name;
    }
    return 'Universidad Desconocida';
  }
  getCompetition() {
    if (this.competition && typeof this.competition === 'object' && this.competition.name) {
      return this.competition.name;
    }
    return 'Competición Desconocida';
  }
  getCaptain() {
    if (this.captain && typeof this.captain === 'object' && this.captain.name) {
      return this.captain.name;
    }
    return 'Capitán Desconocido';
  }
  getPlayers() {
    if (Array.isArray(this.players) && this.players.length > 0) { 
        const playerNames = this.players.map(player => {
            if (player && player.name) {
                return player.name;
            }
            return 'Jugador Desconocido'; 
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
  getLoses() {
    return this.loses;
  }
  getDraws() {
    return this.draws;
  }
}