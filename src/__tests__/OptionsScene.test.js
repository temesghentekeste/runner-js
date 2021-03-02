/* eslint-disable no-undef */
import OptionsScene from '../Scenes/OptionsScene';

const optionsScene = new OptionsScene();
test('optionsScene  is an object', () => {
  expect(typeof optionsScene).toBe('object');
});


it('optionsScene should have many properties', () => {
  expect(Object.keys(optionsScene)).toHaveLength(1);
});

test('optionsScene key name is Credits', () => {
  expect(optionsScene.sys.config).toBe('Options');
});
