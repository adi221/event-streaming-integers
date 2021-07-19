const Pipeline = require('../classes/Pipeline');

test('should return initial variables of a constructor', () => {
  const pipeline = new Pipeline();
  expect(pipeline.fixedArr).toEqual([]);
  expect(pipeline.stages).toEqual([]);
  expect(pipeline.currentFuncReturn).toEqual(null);
  expect(pipeline.currentStage).toEqual(0);
  expect(pipeline.followerStage).toEqual(0);
});

describe('function methods', () => {
  let pipeline;
  beforeEach(() => {
    pipeline = new Pipeline();
  });

  describe('stdinSource', () => {
    test('should return a number', () => {
      const res = pipeline.stdinSource('2');
      expect(res).toBe(2);
    });
    test('should return undefined', () => {
      const res = pipeline.stdinSource('ab');
      expect(res).toBeUndefined();
    });
  });

  describe('filterFunction', () => {
    const predicate = x => x > 0;

    test('should return an empty arr', () => {
      const num = 2;
      const res = pipeline.filterFunction(predicate)(num);
      expect(res).toBe(2);
    });

    test('should return a single value', () => {
      const num = -2;
      const res = pipeline.filterFunction(predicate)(num);
      expect(res).toBeUndefined();
    });
  });

  describe('fixedEventWindow', () => {
    const windowSize = 3;
    const num = 15;

    test('should add number to array and return undefined because it is not full yet', () => {
      expect(pipeline.fixedArr.length).toBe(0);
      const res = pipeline.fixedEventWindow(windowSize)(num);
      expect(res).toBeUndefined();
    });

    test('should add number to array and return undefined because it is full', () => {
      pipeline.fixedArr = [1, 2];
      expect(pipeline.fixedArr.length).toBe(2);
      const res = pipeline.fixedEventWindow(windowSize)(num);
      expect(res).toEqual([1, 2, 15]);
    });
  });

  describe('foldSum', () => {
    test('should returns the correct sum', () => {
      const arr = [2, 4, 5, 7, 8, 2, 22];
      expect(pipeline.foldSum()(arr)).toBe(50);
    });
  });

  describe('foldMedian', () => {
    test('even array length', () => {
      const arr = [2, 4, 7, 5];
      expect(pipeline.foldMedian()(arr)).toBe((4 + 5) / 2);
    });

    test('odd array length', () => {
      const arr = [2, 4, 5];
      expect(pipeline.foldMedian()(arr)).toBe(4);
    });
  });

  describe('fileSink', () => {
    test('should return the val it gets', () => {
      const val = 4;
      const res = pipeline.fileSink()(val);
      expect(res).toBe(val);
    });
  });
});
