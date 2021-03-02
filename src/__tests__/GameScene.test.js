/* eslint-disable no-undef */
import GameScene from '../Scenes/GameScene';

const gameInstance = new GameScene();
test('game scene is a function', () => {
  expect(typeof gameInstance).toBe('object');
});


