// Assume that task is not CPU intensive- if so, clustering or
// thread pool can be taken into account.

// Reason for express - allow the small framework to have generic stdin stdout streams = requests and responses

const express = require('express');
const Pipeline = require('./classes/Pipeline');
const pipelineRouter = require('./examples/rest-api/routers/pipelineRouter');
const examplePipeline = require('./examples/cli-monitor/index');

const app = express();
app.use(express.json());
const PORT = 5000;
app.use('/', pipelineRouter);

process.stdin.setEncoding('utf8');
process.stdin.resume();

process.stdin.on('data', data => {
  examplePipeline.process(data);
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, console.log(`Server listening on PORT ${PORT}`));
app.set('pipeline', examplePipeline);

// For npm
module.exports = Pipeline;
