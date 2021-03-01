/* eslint-disable no-undef */
import 'phaser';
import Button from '../Components/Button';
import config from '../Config/config';

export default class LeadersBoardScene extends Phaser.Scene {
  constructor() {
    super('LeadersBoard');
  }
  
  init(data) {
    this.finalScore = data.score;
  }
  
  create() {
    console.log('Starting...');
    // add text
    this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.1,
        'Game Over | Save Score',
        {
          fontSize: 48,
          color: '#00f',
        }
      )
      .setOrigin();
    this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.2,
        `Final score: ${gameState.score}`,
        { fontSize: 24 }
      )
      .setOrigin();
  }
}
