const axios = require('axios');

/**
 * POST /api/consultant/analyze
 */
const analyzeConsultantData = async (req, res) => {
  try {
    console.log('-------------------------------');
    console.log('DATA RECEIVED FROM ANGULAR');
    console.log(JSON.stringify(req.body, null, 2));

    console.log('SENDING DATA TO AI SERVICE...');

    const aiResponse = await axios.post(
      'http://localhost:8000/analyze',
      req.body,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000
      }
    );

    console.log('RESPONSE RECEIVED FROM AI SERVICE');
    console.log(JSON.stringify(aiResponse.data, null, 2));

    // ✅ Return EXACT data from Python (no transformation)
    return res.status(200).json({
      success: true,
      data: aiResponse.data
    });

  } catch (error) {
    console.error('==== REAL ERROR START ====');

    if (error.response) {
      console.error('STATUS:', error.response.status);
      console.error('DATA:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('MESSAGE:', error.message);
    }

    console.error('==== REAL ERROR END ====');

    return res.status(500).json({
      success: false,
      message: 'Failed to analyze career data'
    });
  }
};

module.exports = {
  analyzeConsultantData
};
