const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const upload = multer();
app.use(cors());

app.post('/analyze', upload.single('media'), async (req, res) => {
  const form = new FormData();
  form.append('media', req.file.buffer, req.file.originalname);
  form.append('models', 'properties');
  form.append('api_user', '519069867'); 
  form.append('api_secret', 'H29Zb2Qm3jGdRvpMG6gkt4txu8iCfNwH'); 

  try {
    const response = await fetch('https://api.sightengine.com/1.0/check.json', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });

    const result = await response.json();
    console.log('Sightengine API response:', result);
    res.json(result);
  } catch (error) {
    console.error('Sightengine API error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
