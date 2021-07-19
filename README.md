## Streaming Engine

Write a small framework that processes an endless event stream of integers. The assumption that processing will be static and sequential, where each processing unit passes the output to the next processing unit unless defined differently (e.g. filter, fixed-event-window). The program should be a Console Application (NodeJS)

The framework should include 6 'building blocks':

1. stdin-source: reads the integers and prints `> ${number} `. For example: 1 => '> 1'.
2. filter: passes events to the next process only if they match specific given predicate.
3. fixed-event-window: aggregates events into a fixed-size array, pass it forward when full.
4. fold-sum: gets an array and returns it's values sum.
5. fold-median: gets an array and returns it's median.
6. file-sink: write a new line with the input value and pass forward the number.

### General Pipeline Example

To demonstrate it using an example, consider the following pipeline:

```javascript
const pipeline = new Pipeline();

pipeline
  .pipe(pipeline.stdinSource)
  .pipe(pipeline.filterFunction(x => x >= 0))
  .pipe(pipeline.fixedEventWindow(2))
  .pipe(pipeline.foldSum())
  .pipe(pipeline.fixedEventWindow(3))
  .pipe(pipeline.foldMedian())
  .pipe(pipeline.fileSink());
```

Let's say user types '2', so it passes the filterFunction and then is added to the first fixedEventWindow ([2]) and then we leave the pipeline.
After, user types '3', so fixedEventWindow is [2, 3] and then it passes onto the next stage, then foldSum returns 5, and then we stop at the second fixedEventWindow ([5]).
Then we type '4' and we stop at the second fixedEventWindow ([5, 4]).
Then we type '-54' and we stop at the filter.
Then we type '1' and the second FixedEventWindow becomes full [5, 4, 1] so we pass on the pipeline, foldMedian returns 4 and then fileSink prints 4 and returns it, so we can continue again to the next numbers.

### Programmatic implementation

Instanciate Pipeline new instance (Pipeline inherits StagesPipeline).

```javascript
const pipeline = new Pipeline();
```

Add wanted functions to the stages pipeline.

```javascript
const pipeline = new Pipeline();

pipeline
  .pipe(pipeline.stdinSource)
  .pipe(pipeline.filterFunction(x => x >= 0))
  .pipe(pipeline.fixedEventWindow(2))
  .pipe(pipeline.foldSum())
  .pipe(pipeline.fixedEventWindow(3))
  .pipe(pipeline.foldMedian())
  .pipe(pipeline.fileSink());
```

Alternatively, you may use pass a preset array:

```javascript
const pipeline = new Pipeline([
  pipeline.stdinSource,
  pipeline.filterFunction(x => x >= 0),
  pipeline.fileSink(),
]);
```

Lastly, open stdinput stream so you can get input from user

```javascript
process.stdin.setEncoding('utf8');
process.stdin.resume();

process.stdin.on('data', data => {
  pipeline.process(data);
});
```

### Installation

Run the below command to install using NPM

```
npm install --save event-stream-integers
```

## Usage

Operations in a pipeline must be part of the class.
In order to use new methods, you need to extend class.

```javascript
var pipeline = require('event-stream-integers');
```
