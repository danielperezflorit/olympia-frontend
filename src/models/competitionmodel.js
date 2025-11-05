export default class Team {
  constructor(_id, name, teams = []) {
    this._id = _id;
    this.name = name;
    this.teams = teams;
  }

  getFullName() {
    return this.name;
  }
  getTeams() {
    return this.teams;
  }
}