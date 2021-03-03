/* eslint-disable no-undef */

import 'phaser';
import background from '../utils/background';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
    this.backgrounds = background;
  }

  preload() {
    // backgrounds
    this.backgrounds.forEach((backArr) => {
      backArr.forEach((layer) => this.load.image(layer, `src/assets/background/${layer}.jpg`));
    });

    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(1.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      // eslint-disable-next-line radix
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    // load sprite for trophies
    this.load.spritesheet('coin', 'src/assets/trophy/coin.png', {
      frameWidth: 20,
      frameHeight: 20,
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', 'src/assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'src/assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'src/assets/logo.png');
    this.load.image('box', 'src/assets/ui/grey_box.png');
    this.load.image('checkedBox', 'src/assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['src/assets/music/GameIntro.mp3']);
    this.load.audio('collectCoin', ['src/assets/music/coin.mp3']);
    this.load.audio('gameOver', ['src/assets/music/gameOver.mp3']);
  }


  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
