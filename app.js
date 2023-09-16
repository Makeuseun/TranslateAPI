const express = require('express');
const { translate } = require('@vitalets/google-translate-api');
const app = express();
const port = 3333;
const routes = ['translate']
const example = `http://localhost:${port}/translate/你好世界`;
const outputLanguage = 'en'

app.get('/', (req, res) => {
  return res.json({ message: "API Working!", routes: routes });
});

app.get('/translate', (req, res) => {
  return res.json({ message: "Type anything to translate", example: example });
});

app.get('/translate/:text', async (req, res) => {
  const textToTranslate = req.params.text;
  try {
    const response = await translate(textToTranslate, { to: outputLanguage });
    return res.json({ translation: response.text });
  } catch (error) {
    if (error.name === 'TooManyRequestsError') {
      return res.status(429).json({ error: "Too Many Requests" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(port, () => {
  console.log(`API running in "http://localhost:${port}"`);
});