export default class Team {
  constructor(_id, name, competitions = [], players = [], matches, wins, losses, draws) {
    this._id = _id;
    this.name = name;
    this.competitions = competitions;
    this.players = players;
    this.matches = matches;
    this.wins = wins;
    this.losses = losses;
    this.draws = draws;
  }

  getFullName() {
    return this.name;
  }

  getCompetitions() {
    if (Array.isArray(this.competitions) && this.competitions.length > 0) { 
        const competitionsNames = this.competitions.map(competitions => {
            if (competitions && competitions.name) {
                return competitions.name;
            }
            return 'Competicion Desconocida'; // Manejo de error si el objeto está incompleto
        });
        return competitionsNames.join(', ');
    }
    return 'Sin competiciones';
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