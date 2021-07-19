const Pipeline = require('../classes/Pipeline');

describe('exercise tests', () => {
  let pipeline;
  const log = console.log;
  beforeEach(() => {
    pipeline = new Pipeline();
    console.log = jest.fn();
  });
  afterEach(() => {
    console.log = log; // restore original console.log after all tests
  });

  describe('first pipeline', () => {
    beforeEach(() => {
      pipeline
        .pipe(pipeline.stdinSource)
        .pipe(pipeline.filterFunction(x => x >= 0))
        .pipe(pipeline.fixedEventWindow(2))
        .pipe(pipeline.foldSum())
        .pipe(pipeline.fixedEventWindow(3))
        .pipe(pipeline.foldMedian())
        .pipe(pipeline.fileSink());
    });

    test('should log `ANSWER: 4`', () => {
      [2, 3, 4, -54, 1].forEach(num => pipeline.process(num));

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 4')).toBe(true);
    });

    test('should log `ANSWER: 2`', () => {
      [2, -33, 4, 2, -54, 1].forEach(num => pipeline.process(num));

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 2')).toBe(true);
    });

    test('should log `ANSWER: 2`', () => {
      [2, 'a', 'b', 'c', -33, 4, 2, -54, 1].forEach(num =>
        pipeline.process(num)
      );

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 2')).toBe(true);
    });

    test('should log `ANSWER: 3`', () => {
      [2, 'a', 'b', 'c', -33, 4, 2, 3].forEach(num => pipeline.process(num));

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 3')).toBe(true);
    });
  });

  describe('second pipeline', () => {
    beforeEach(() => {
      pipeline
        .pipe(pipeline.stdinSource)
        .pipe(pipeline.filterFunction(x => x % 2 === 0))
        .pipe(pipeline.fixedEventWindow(2))
        .pipe(pipeline.foldSum())
        .pipe(pipeline.fixedEventWindow(3))
        .pipe(pipeline.foldMedian())
        .pipe(pipeline.fileSink());
    });

    test('should log `ANSWER: 2`', () => {
      [2, 3, 4, -54, 1, 2].forEach(num => pipeline.process(num));

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 2')).toBe(true);
    });

    test('should log `ANSWER: 2`', () => {
      [2, 3, 'a', '//', 4, -54, 1, 2].forEach(num => pipeline.process(num));

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 2')).toBe(true);
    });

    test('should log `ANSWER: 10`', () => {
      [21, 3, 'a', '//', 4, -54, 1, 20, 10].forEach(num =>
        pipeline.process(num)
      );

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 10')).toBe(true);
    });

    test('should log `ANSWER: 10`', () => {
      [21, 3, 'a', '//', 4, -54, 1, 20, 10, 12, 15].forEach(num =>
        pipeline.process(num)
      );

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 10')).toBe(true);
    });
  });

  describe('third pipeline', () => {
    beforeEach(() => {
      pipeline
        .pipe(pipeline.stdinSource)
        .pipe(pipeline.filterFunction(x => x === 4))
        .pipe(pipeline.fixedEventWindow(2))
        .pipe(pipeline.foldSum())
        .pipe(pipeline.fileSink());
    });

    test('should log `ANSWER: 8`', () => {
      [21, 3, 'a', '//', 4, -54, 4].forEach(num => pipeline.process(num));

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 8')).toBe(true);
    });
  });

  describe('forth pipeline', () => {
    beforeEach(() => {
      pipeline
        .pipe(pipeline.stdinSource)
        .pipe(pipeline.filterFunction(x => x % 5 === 0))
        .pipe(pipeline.fixedEventWindow(4))
        .pipe(pipeline.foldSum())
        .pipe(pipeline.fileSink());
    });

    test('should log `ANSWER: 135`', () => {
      [20, 15, 1, 2, 3, 1, 2, 'a', 'b', 'c', 'q', 15, 85].forEach(num =>
        pipeline.process(num)
      );

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 135')).toBe(true);
    });

    test('should log `ANSWER: 135`', () => {
      [20, 15, 1, 2, 3, 1, 2, 'a', 'b', 'c', 'q', 15, 8, 'ddd', 0].forEach(
        num => pipeline.process(num)
      );

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 50')).toBe(true);
    });
  });

  describe('forth pipeline', () => {
    beforeEach(() => {
      pipeline
        .pipe(pipeline.stdinSource)
        .pipe(pipeline.filterFunction(x => x < 0))
        .pipe(pipeline.fixedEventWindow(4))
        .pipe(pipeline.foldSum())
        .pipe(pipeline.fixedEventWindow(2))
        .pipe(pipeline.foldSum())
        .pipe(pipeline.fileSink());
    });

    test('should log `ANSWER: -40`', () => {
      [
        -20,
        15,
        1,
        2,
        -3,
        1,
        -2,
        'a',
        'b',
        'c',
        'q',
        15,
        8,
        'ddd',
        0,
        -9,
        -6,
      ].forEach(num => pipeline.process(num));

      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: -40')).toBe(true);
    });
  });

  describe('fifth pipeline', () => {
    beforeEach(() => {
      pipeline.pipe(pipeline.stdinSource).pipe(pipeline.fileSink());
    });

    test('should log `ANSWER: 1`', () => {
      [1].forEach(num => pipeline.process(num));
      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 1')).toBe(true);
    });
  });

  describe('sixth pipeline', () => {
    beforeEach(() => {
      pipeline
        .pipe(pipeline.stdinSource)
        .pipe(pipeline.foldSum())
        .pipe(pipeline.fileSink());
    });

    test('should log `ANSWER: 1`', () => {
      [1].forEach(num => pipeline.process(num));
      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 1')).toBe(true);
    });
  });

  describe('seventh pipeline', () => {
    beforeEach(() => {
      pipeline
        .pipe(pipeline.stdinSource)
        .pipe(pipeline.foldMedian())
        .pipe(pipeline.fileSink());
    });

    test('should log `ANSWER: 1`', () => {
      [1].forEach(num => pipeline.process(num));
      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 1')).toBe(true);
    });
  });

  describe('eighth pipeline', () => {
    beforeEach(() => {
      pipeline
        .pipe(pipeline.stdinSource)
        .pipe(pipeline.filterFunction(x => x > 0))
        .pipe(pipeline.foldMedian())
        .pipe(pipeline.fileSink());
    });

    test('should log `ANSWER: 10`', () => {
      [-1, 10].forEach(num => pipeline.process(num));
      const stringifiedLogs = JSON.stringify(console.log.mock.calls);
      expect(stringifiedLogs.includes('ANSWER: 10')).toBe(true);
    });
  });
});
