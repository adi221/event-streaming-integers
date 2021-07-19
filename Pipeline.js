const StagesPipeline = require('./StagesPipeline');

/**
 * Creates a new pipeline.
 *
 * @constructor
 * fixedArr = array to store fixedEventWindow values
 */
class Pipeline extends StagesPipeline {
  constructor(presetStages = []) {
    super(presetStages);
    this.fixedArr = [];
  }

  /**
   * stdinSource - checks the type of the input - if the input is
   * not a num return false and quit the pipeline.
   * @param {string} data user's input
   * @returns {number | undefined}
   */
  stdinSource(data) {
    data = data.toString().trim();
    if (!isNaN(data)) {
      console.log(`> ${data}`);
      return Number(data);
    }
  }

  /**
   * filterFunction - checks if the number matches a predicate based on
   * the given predicate in the initilization time.
   * @param {array} arr the user's integers input
   * @param {function} predicate the predicate function to check condition
   * return {boolean} true or false
   */
  filterFunction(predicate) {
    return num => {
      const arr = [+num].filter(n => predicate(n));
      return arr.length ? arr[0] : undefined;
    };
  }

  /**
   * fixedEventWindow - passes an array with a fixed length
   * @param {*} numbers
   * @param {numbers} windowSize max size of the array
   * @returns {number[]} array of windowSize's length
   */
  fixedEventWindow(windowSize) {
    return number => {
      number = +number;
      this.fixedArr.push(number);
      if (this.fixedArr.length === windowSize) {
        const res = [...this.fixedArr];
        this.fixedArr.length = 0;
        this.removeStage();
        return res;
      }
    };
  }

  /**
   * foldSum - calculates the sum of the numbers of the array
   * @param {number[]} numbers array of numbers
   * @returns {number} sum of the numbers in the array
   */
  foldSum() {
    return numbers => {
      return numbers.reduce((acc, num) => acc + num, 0);
    };
  }

  /**
   * foldMedian - return the median value for an array of numbers
   * @param {number[]} arr arr of numbers
   * @returns {number} the median
   */
  foldMedian() {
    return arr => {
      console.log({ arr, len: arr.length });
      if (arr.length === 0) return 0;
      arr.sort((a, b) => a - b);
      const middle = Math.floor(arr.length / 2);
      let res;
      // If length of arr is odd then res is the number in the middle index,
      // else return the average of the 2 numbers in the middle
      if (arr.length % 2 === 1) res = arr[middle];
      else res = (arr[middle - 1] + arr[middle]) / 2;
      return res;
    };
  }

  /**
   * fileSink - logs the number
   * @param {number} val
   */
  fileSink() {
    return val => {
      console.log('ANSWER:', val);
      return val;
    };
  }
}

module.exports = Pipeline;