import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('platform', 'platform.png');
    this.load.image(
      'player',
      'https://content.codecademy.com/courses/learn-phaser/physics/codey.png'
    );
    this.load.image(
      'sky',
      'https://content.codecademy.com/courses/learn-phaser/sky.jpg'
    );
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}
