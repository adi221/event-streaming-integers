const Pipeline = require('../../classes/Pipeline');
const examplePipeline = new Pipeline();

// The reason I call the functions inside the pipeline is because they return another function (closure)
// that contains the piece of data that is retrieved from the pipeline and can't be given in this context.
examplePipeline
  .pipe(examplePipeline.stdinSource)
  .pipe(examplePipeline.filterFunction(x => x >= 0))
  .pipe(examplePipeline.fixedEventWindow(2))
  .pipe(examplePipeline.foldSum())
  .pipe(examplePipeline.fixedEventWindow(3))
  .pipe(examplePipeline.foldMedian())
  .pipe(examplePipeline.fileSink());

module.exports = examplePipeline;
