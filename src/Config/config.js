import 'phaser';
const content = document.querySelector('#content')
export default {
  type: Phaser.AUTO,
  parent: content,
  width: 800,
  height: 600,
  // physics settings
  physics: {
    default: 'arcade',
  },
};
