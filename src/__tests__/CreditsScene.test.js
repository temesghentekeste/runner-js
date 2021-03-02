import CreditsScene from '../Scenes/CreditsScene';

const creditsScene = new CreditsScene();

test('creditsScene is of type an object', () => {
  expect(typeof creditsScene).toBe('object');
});

test('creditsScene key name is Credits', () => {
  expect(creditsScene.sys.config).toBe('Credits');
});
