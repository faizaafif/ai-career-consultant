const express = require('express');
const router = express.Router();

const {
  analyzeConsultantData
} = require('../controllers/consultant.controller');

router.post('/analyze', analyzeConsultantData);

module.exports = router;
