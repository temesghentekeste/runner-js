/* eslint-disable no-undef */
import GameScene from '../Scenes/GameScene';

const gameInstance = new GameScene();
test('game scene is a function', () => {
  expect(typeof gameInstance).toBe('object');
});

it('should have selfScale atribute set to 1', () => {
  expect(gameInstance.selfScale).toBe(1);
});

it('gameInstance should have many properties', () => {
  expect(Object.keys(gameInstance)).toHaveLength(6);
});
