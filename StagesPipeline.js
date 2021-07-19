/**
 * Creates a new pipeline. Optionally pass an array of stages
 *
 * @param presetStages[]
 * @constructor
 * stages = stages in the pipeline
 * currentFuncReturn = track the return value of the functions in pipeline
 * currentStage = current index in the stages array
 */
class StagesPipeline {
  constructor(presetStages) {
    this.stages = presetStages || [];
    this.currentFuncReturn = null;
    this.currentStage = 0;
  }

  /**
   * Adds a new stage. Stage can be a function or some literal value. In case
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

  // *waitForStage() {
  //   while (this.currentStage < this.stages.length) {
  //     const funcReturn = this.stages[this.currentStage](this.currentFuncReturn);
  //     // it means that the filterArr is empty or fixedArr is not full yet
  //     // so wait for next inputs
  //     if (funcReturn === undefined) return;
  //     this.currentStage++;
  //     if (this.currentStage === this.stages.length - 1) {
  //       this.currentStage === 0;
  //     }
  //     yield funcReturn;
  //   }
  // }

  waitForStage() {
    while (true) {
      const index = this.currentStage % this.stages.length;
      const funcReturn = this.stages[index](this.currentFuncReturn);
      // it means that the filterArr is empty or fixedArr is not full yet
      // so wait for next inputs
      if (funcReturn === undefined) return;
      this.currentFuncReturn = funcReturn;
      this.currentStage++;
    }
  }

  /**
   * process - starts the pipeline
   * @param {string} initialValue user input to pass to the first function
   */
  process(initialValue) {
    if (this.stages.length === 0 || initialValue === undefined) return null;
    this.currentFuncReturn = initialValue;
    this.waitForStage();
  }
  // process(initialValue) {
  //   if (this.stages.length === 0 || initialValue === undefined) return null;
  //   this.currentFuncReturn = initialValue;
  //   const generatorFunc = this.waitForStage();

  //   let done = false;
  //   while (!done) {
  //     let currentNext = generatorFunc.next();
  //     // console.log('Current next:', currentNext);
  //     this.currentFuncReturn = currentNext.value;
  //     done = currentNext.done;
  //   }
  // }
}

module.exports = StagesPipeline;
