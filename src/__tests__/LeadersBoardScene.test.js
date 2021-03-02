/* eslint-disable no-undef */
import LeadersBoardScene from '../Scenes/LeadersBoardScene';

const leadersBoardScene = new LeadersBoardScene();
test('leadersBoardScene  is a function', () => {
  expect(typeof leadersBoardScene).toBe('object');
});


it('leadersBoardScene should have many properties', () => {
  expect(Object.keys(leadersBoardScene)).toHaveLength(1);
});

test('leadersBoardScene key name is Credits', () => {
  expect(leadersBoardScene.sys.config).toBe('LeadersBoard');
});
