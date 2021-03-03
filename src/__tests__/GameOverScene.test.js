import GameOverScene from '../Scenes/GameOverScene';

const gameOverScene = new GameOverScene();

test('gameOverScene is of type object', () => {
  expect(typeof gameOverScene).toBe('object');
});

test('gameOverScene key name is Boot', () => {
  expect(gameOverScene.sys.config).toBe('GameOver');
});
