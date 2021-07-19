const Pipeline = require('./Pipeline');

const pipeline = new Pipeline();

pipeline
  .pipe(pipeline.stdinSource)
  .pipe(pipeline.filterFunction(x => x >= 0))
  .pipe(pipeline.fixedEventWindow(2))
  .pipe(pipeline.foldSum())
  .pipe(pipeline.fixedEventWindow(3))
  .pipe(pipeline.foldMedian())
  .pipe(pipeline.fileSink());

process.stdin.setEncoding('utf8');
process.stdin.resume();

process.stdin.on('data', data => {
  pipeline.process(data);
});
