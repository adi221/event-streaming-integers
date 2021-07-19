// Assume that task is not CPU intensive- if so, clustering or
// thread pool can be taken into account.

const Pipeline = require('./classes/Pipeline');

const pipeline = new Pipeline();

// The reason I call the functions is because they return another function (closure)
// that contains the piece of data that is retrieved from the pipeline and can't be given in this context.
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

// For npm
module.exports = Pipeline;
