export default class User {
  constructor(_id, name, mail, password, team, competitions) {
    this._id = _id;
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.team = team;
    this.competitions = competitions;
  }

  getFullName() {
    return this.name;
  }

  getEmail() {
    return this.mail;
  }

  getTeamName() {
    // 1. Verificar si el campo 'team' existe y no es null
    if (this.team) {
      // 2. Si es un OBJETO (poblado) Y tiene la propiedad 'name', devolver el nombre.
      // // Los objetos poblados tienen la estructura { _id: ..., name: ... }
      if (typeof this.team === 'object' && this.team.name) {
        return this.team.name;
      } 
    }
    // 4. Si el campo está vacío (null/undefined)
    return 'Sin equipo'; 
}

}
