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
    this.add.text(300, position, 'RANK').setTint(0x00ff00);
    this.add.text(400, position, 'NAME').setTint(0x00ff00);
    this.add.text(500, position, 'SCORE').setTint(0x00ff00);
    const request = new Request();
    this.usersScore = await request.getAllPlayers();
    this.usersSortedScore = this.usersScore.result.sort((a, b) =>
      a.score > b.score ? -1 : 1
    );

    position += 25;
    this.usersSortedScore.forEach((result, index) => {
      if (index < 10) {
        this.add.text(300, position, `  ${index + 1} `).setTint(0xff0000);

        this.add.text(400, position, `${result.user}`).setTint(0xff0000);

        this.add.text(500, position, `${result.score}`).setTint(0xff0000);

        position += 25;
      }
    });

    this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.8,
        'Press space to play again.'
      )
      .setOrigin();

    // Start a new game 
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('Game');
    });
  }
}
