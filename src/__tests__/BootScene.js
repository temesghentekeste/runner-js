import BootScene from '../Scenes/BootScene';

const bootScene = new BootScene();

test('BootScene is of type object', () => {
  expect(typeof bootScene).toBe('object');
});

