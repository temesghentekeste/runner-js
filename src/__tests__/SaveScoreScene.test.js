/* eslint-disable no-undef */
import SaveScoreScene from '../Scenes/SaveScoreScene';

const saveScoreScene = new SaveScoreScene();
test('saveScoreScene  is an object', () => {
  expect(typeof saveScoreScene).toBe('object');
});

it('saveScoreScene should have many properties', () => {
  expect(Object.keys(saveScoreScene)).toHaveLength(1);
});

test('saveScoreScene key name is Credits', () => {
  expect(saveScoreScene.sys.config).toBe('SaveScore');
});
