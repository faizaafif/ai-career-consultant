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

/**
 * POST /api/consultant/chat
 */
const chatWithConsultant = async (req, res) => {
  try {
    console.log('-------------------------------');
    console.log('CHAT REQUEST RECEIVED FROM ANGULAR');
    console.log(JSON.stringify(req.body, null, 2));

    console.log('SENDING CHAT TO AI SERVICE...');

    const aiResponse = await axios.post(
      'http://localhost:8000/chat',
      req.body,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000
      }
    );

    console.log('CHAT RESPONSE RECEIVED FROM AI SERVICE');
    console.log(JSON.stringify(aiResponse.data, null, 2));

    return res.status(200).json({
      success: true,
      data: aiResponse.data
    });

  } catch (error) {
    console.error('==== CHAT ERROR START ====');

    if (error.response) {
      console.error('STATUS:', error.response.status);
      console.error('DATA:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('MESSAGE:', error.message);
    }

    console.error('==== CHAT ERROR END ====');

    return res.status(500).json({
      success: false,
      message: 'Failed to process chat request'
    });
  }
};

module.exports = {
  analyzeConsultantData,
  chatWithConsultant
};
