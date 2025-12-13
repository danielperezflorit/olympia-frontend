export default class Team {
  constructor(_id, name, university, competition, players = [], matches, wins, losses, draws) {
    this._id = _id;
    this.name = name;
    this.university = university;
    this.competition = competition;
    this.players = players;
    this.matches = matches;
    this.wins = wins;
    this.losses = losses;
    this.draws = draws;
  }

  getFullName() {
    return this.name;
  }

  getUniversity() {
    if (this.university && typeof this.university === 'object' && this.university.name) {
      return this.university.name;
    }

    // Si no está poblada, devuelve un mensaje predeterminado.
    return 'Universidad Desconocida';
  }

  getCompetition() {
    if (this.competition && typeof this.competition === 'object' && this.competition.name) {
      return this.competition.name;
    }

    // Si no está poblada, devuelve un mensaje predeterminado.
    return 'Competición Desconocida';
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