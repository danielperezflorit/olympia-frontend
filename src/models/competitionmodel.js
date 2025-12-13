export default class Competition {
  constructor(_id, name, teams = [], sport) {
    this._id = _id;
    this.name = name;
    this.teams = teams;
    this.sport = sport;
  }

  getFullName() {
    return this.name;
  }
  getTeams() {
    if (Array.isArray(this.teams) && this.teams.length > 0) { 
        const teamNames = this.teams.map(team => {
            if (team && team.name) {
                return team.name;
            }
            return 'Equipo Desconocido'; // Manejo de error si el objeto está incompleto
        });
        return teamNames.join(', ');
    }
    return 'Sin equipos';
  }
  getSport() {
    if (this.sport && typeof this.sport === 'object' && this.sport.name) {
      return this.sport.name;
    }

    // Si no está poblada, devuelve un mensaje predeterminado.
    return 'Deporte Desconocido';
  }
}