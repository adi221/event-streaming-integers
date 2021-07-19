const StagesPipeline = require('../classes/StagesPipeline');

test('should return initial variables of a constructor', () => {
  const stagesPipeline = new StagesPipeline();
  expect(stagesPipeline.stages).toEqual([]);
  expect(stagesPipeline.currentFuncReturn).toEqual(null);
  expect(stagesPipeline.currentStage).toEqual(0);
  expect(stagesPipeline.followerStage).toEqual(0);
});

describe('this.stages` length should be equal to the number of functions added to pipeline', () => {
  test('by adding to constructor', () => {
    const stagesPipeline = new StagesPipeline([() => {}, () => {}, () => {}]);

    expect(stagesPipeline.stages.length).toBe(3);
  });

  test('by using pipe', () => {
    const stagesPipeline = new StagesPipeline();

    stagesPipeline.pipe(() => {});
    stagesPipeline.pipe(() => {});
    stagesPipeline.pipe(() => {});

    expect(stagesPipeline.stages.length).toBe(3);
  });
});
