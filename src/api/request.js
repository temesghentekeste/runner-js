// eslint-disable-next-line no-unused-vars
export default class Request {
  constructor() {
    this.apiKey = '5coxWis0ZvCOhi2R2Uqk';
    this.baseURI =
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  }

  async createGame() {
    const gameName = { name: 'Runner JS' };
    const response = await fetch(this.baseURI, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameName),
    });

    if (response.status !== 201) {
      return new Error('Unable to create a Game Object');
    }

    const gameId = await response.json();
    return gameId;
  }
  async saveScore(resource, user, score) {
    const gameId = '5coxWis0ZvCOhi2R2Uqk';
    const gameScoresURI = `${resource}:${gameId}/scores`;
    const playerScore = {
      user,
      score,
    };

    const response = await fetch(gameScoresURI, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerScore),
    });

    if (response.status !== 201) {
      return new Error('Unable to save player score');
    }

    const data = await response.json();
    return data;
  }

  async getAllPlayers(resource) {
    const gameId = 'EhLxS6V5sZPuCVJXFpTU';
    const gameScoresURI = `${resource}:${gameId}/scores`;

    const response = await fetch(gameScoresURI);

    if (response.status !== 200) {
      return new Error('Unable to save player score');
    }

    const data = await response.json();
    return data;
  }
}
