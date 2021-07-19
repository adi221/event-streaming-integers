/**
 * Creates a new pipeline. Optionally pass an array of stages
 *
 * @param presetStages[]
 * @constructor
 * stages = stages in the pipeline
 * currentFuncReturn = track the return value of the functions in pipeline
 * currentStage = current last index in the stages array (i.e index that retains the last stage so far - to avoid staying in the same fixedEventWindow array)
 * followerStage = current index in stages array
 */
class StagesPipeline {
  constructor(presetStages) {
    this.stages = presetStages || [];
    this.currentFuncReturn = null;
    this.currentStage = 0;
    this.followerStage = 0;
  }

  /**
   * pipe - adds a new stage. Stage can be a function or some literal value. In case
   * of literal values. That specified value will be passed to the next stage and the
   * output from last stage gets ignored
   *
   * @param stage
   * @returns {Pipeline}
   */
  pipe(stage) {
    this.stages.push(stage);
    return this;
  }

  /**
   * _waitForStage - function to call the methods inside the stages and track the
   * current function to call and what it returns so we can pass it to the next
   * function in the stages pipeline
   */
  _waitForStage() {
    while (this.followerStage < this.stages.length) {
      const funcReturn = this.stages[this.followerStage](
        this.currentFuncReturn
      );
      // it means that the filterArr is empty or fixedArr is not full yet
      // so we are done with current input
      if (funcReturn === undefined) {
        this.currentStage = Math.max(this.currentStage, this.followerStage);
        this.followerStage = 0;
        return;
      }

      this.currentFuncReturn = funcReturn;
      this.followerStage++;
      // Increase currentStage only when follower is one step ahead
      if (this.followerStage > this.currentStage) {
        this.currentStage = this.followerStage;
      }
    }

    // Restore the values so we can start a new pipeline
    this.followerStage = 0;
    this.currentStage = 0;
  }

  /**
   * process - starts the pipeline
   * @param {string} initialValue user`s input to pass to the first function
   */
  process(initialValue) {
    if (this.stages.length === 0 || initialValue === undefined) return null;
    this.currentFuncReturn = initialValue;
    this._waitForStage();
  }
}

module.exports = StagesPipeline;
