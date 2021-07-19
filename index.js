// Assume that task is not CPU intensive- if so, clustering or
// thread pool can be taken into account.

// Reason for express - allow the small framework to have generic stdin stdout values

const express = require('express');
const Pipeline = require('./classes/Pipeline');
const pipelineRouter = require('./routers/pipelineRouters');

const app = express();
app.use(express.json());
const PORT = 5000;
app.use('/', pipelineRouter);

const pipeline = new Pipeline();

// The reason I call the functions inside the pipeline is because they return another function (closure)
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
  console.log(data, 'DATA');
  pipeline.process(data);
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, console.log(`Server listening on PORT ${PORT}`));
app.set('pipeline', pipeline);

// For npm
module.exports = Pipeline;
