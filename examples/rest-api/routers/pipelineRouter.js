const express = require('express');
const pipelineRouter = express.Router();
const { sendInput } = require('../controllers/pipelineController');

pipelineRouter.post('/send-pipeline', sendInput);

module.exports = pipelineRouter;
