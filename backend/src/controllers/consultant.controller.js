const axios = require('axios');

/**
 * POST /api/consultant/analyze
 */
const analyzeConsultantData = async (req, res) => {
  try {
    console.log('-------------------------------');
    console.log('📥 DATA RECEIVED FROM ANGULAR');
    console.log(JSON.stringify(req.body, null, 2));

    console.log('📤 SENDING DATA TO AI SERVICE...');

    const aiResponse = await axios.post(
      'http://localhost:8000/analyze',
      req.body,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000
      }
    );

    console.log('📨 RESPONSE RECEIVED FROM AI SERVICE');
    console.log(JSON.stringify(aiResponse.data, null, 2));

    return res.status(200).json({
      success: true,
      analysis: aiResponse.data.analysis
    });

  } catch (error) {
    console.error('❌ ERROR DURING AI ANALYSIS');

    if (error.response) {
      console.error('AI SERVICE ERROR:', error.response.data);
    } else {
      console.error('GENERAL ERROR:', error.message);
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to analyze career data'
    });
  }
};

module.exports = {
  analyzeConsultantData
};
