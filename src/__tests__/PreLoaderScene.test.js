/* eslint-disable no-undef */
import PreloaderScene from '../Scenes/PreloaderScene';

const preloaderScene = new PreloaderScene();
test('preloaderScene  is an object', () => {
  expect(typeof preloaderScene).toBe('object');
});

it('preloaderScene should have many properties', () => {
  expect(Object.keys(preloaderScene)).toHaveLength(2);
});

test('preloaderScene key name is Credits', () => {
  expect(preloaderScene.sys.config).toBe('Preloader');
});
