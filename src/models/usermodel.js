export default class User {
  constructor(_id, name, mail, password, university, team, competitions, type) {
    this._id = _id;
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.university = university;
    this.team = team;
    this.competitions = competitions;
    this.type = type;
  }

  getFullName() {
    return this.name;
  }

  getEmail() {
    return this.mail;
  }

  getTeamName() {
    if (this.team) {
      if (typeof this.team === 'object' && this.team.name) {
        return this.team.name;
      } 
    }
    return 'Sin equipo'; 
  }
  getUniversityName() {
    if (this.university) {
      if (typeof this.university === 'object' && this.university.name) {
        return this.university.name;
      } 
    }
    return 'Sin universidad'; 
  }

  getRol() {
    return this.type;
  }

}
