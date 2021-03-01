import 'phaser';
const content = document.querySelector('#content');
export default {
  type: Phaser.AUTO,
  parent: content,
  width: 900,
  height: 800,
  // physics settings
  physics: {
    default: 'arcade',
  },
  pixelArt: true,
  dom: {
    createContainer: true,
  },
};
