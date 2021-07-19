const express = require('express');
const router = express.Router();

router.post('/send-pipeline', (req, res) => {
  try {
    let { input } = req.body;

    JSON.parse(JSON.stringify(input));

    if (!input || !typeof input === 'string') {
      return res.json({
        success: false,
        message: 'Invalid input. Enter either a string or an array of numbers.',
      });
    }

    input = input.split(' ');
    const pipeline = req.app.get('pipeline');
    input.forEach(val => {
      pipeline.process(val);
    });

    res.json({
      success: true,
      message:
        'Values were passed to the pipeline, look at the console for the output :)',
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
