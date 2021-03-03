/* eslint-disable no-undef */
import TitleScene from '../Scenes/TitleScene';

const titleScene = new TitleScene();
test('titleScene  is an object', () => {
  expect(typeof titleScene).toBe('object');
});

it('titleScene should have many properties', () => {
  expect(Object.keys(titleScene)).toHaveLength(1);
});

test('titleScene key name is Credits', () => {
  expect(titleScene.sys.config).toBe('Title');
});
