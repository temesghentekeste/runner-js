import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('logo', 'src/assets/logo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
