const express = require('express');
const pipelineRouter = express.Router();

// @desc Send an input to the pipeline
// @route POST /send-pipeline
// @access Public
const sendInput = (req, res) => {
  try {
    let { input } = req.body;

    if (!input || !typeof input === 'string') {
      return res.status(401).json({
        success: false,
        message: 'Invalid input. Enter either a string or an array of numbers.',
      });
    }

    input = input.split(' ');
    const pipeline = req.app.get('pipeline');
    input.forEach(val => {
      pipeline.process(val);
    });

    return res.status(200).json({
      success: true,
      message:
        'Values were passed to the pipeline, look at the console for the output :)',
    });
  } catch (error) {
    console.error(error);
  }
};

pipelineRouter.post('/send-pipeline', sendInput);

module.exports = { pipelineRouter, sendInput };
