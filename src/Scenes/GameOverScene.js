/* eslint-disable no-undef */
import 'phaser';
import Button from '../Components/Button';
import config from '../Config/config';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.previousScene = data.previousScene;
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.add.image(400, 300, 'restBG');

    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Try Again',
      'Game'
    );

    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'blueButton1',
      'blueButton2',
      'Save Score',
      'PlayGame'
    );

    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Main Menu',
      'Title'
    );

    if (this.model.soundOn === true) this.sound.play('gameOver');
  }
}
