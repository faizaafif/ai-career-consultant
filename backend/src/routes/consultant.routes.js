const express = require('express');
const router = express.Router();

const {
  analyzeConsultantData,
  chatWithConsultant
} = require('../controllers/consultant.controller');

router.post('/analyze', analyzeConsultantData);
router.post('/chat', chatWithConsultant);

module.exports = router;
