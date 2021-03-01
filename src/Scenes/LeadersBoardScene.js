/* eslint-disable no-undef */
import 'phaser';
import config from '../Config/config';
import Request from '../api/request';

export default class LeadersBoardScene extends Phaser.Scene {
  constructor() {
    super('LeadersBoard');
  }

  async create() {
    this.add
      .text(this.scale.width * 0.5, this.scale.height * 0.1, 'Leadersboard', {
        fontSize: 48,
        color: '#00f',
      })
      .setOrigin();

    let position = 130;
    // fetching the score
    this.add.text(300, position, 'RANK  NAME   SCORE').setTint(0x00ff00);
    const request = new Request();
    this.usersScore = await request.getAllPlayers();
    this.usersSortedScore = this.usersScore.result.sort((a, b) =>
      a.score > b.score ? -1 : 1
    );

    position += 25;
    this.usersSortedScore.forEach((result, index) => {
      if (index < 10) {
        this.add
          .text(300, position, `  ${index + 1}     ${result.user}   ${result.score}`)
          .setTint(0xff0000);
        position += 25;
      }
    });

  }
}
