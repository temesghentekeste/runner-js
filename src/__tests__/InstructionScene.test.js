/* eslint-disable no-undef */
import InstructionScene from '../Scenes/InstructionScene';

const instructionScene = new InstructionScene();
test('instructionScene  is a function', () => {
  expect(typeof instructionScene).toBe('object');
});


it('instructionScene should have many properties', () => {
  expect(Object.keys(instructionScene)).toHaveLength(1);
});

test('instructionScene key name is Credits', () => {
  expect(instructionScene.sys.config).toBe('Instruction');
});
