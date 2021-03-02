/* eslint-disable no-undef */
import PreloaderScene from '../Scenes/PreloaderScene';

const preloaderScene = new PreloaderScene();
test('preloader  is an object', () => {
  expect(typeof preloaderScene).toBe('object');
});

it('preloader should have many properties', () => {
  expect(Object.keys(preloaderScene)).toHaveLength(2);
});

test('preloader key name is Credits', () => {
  expect(preloaderScene.sys.config).toBe('Preloader');
});
