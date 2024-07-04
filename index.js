const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.get('/antam', async (req, res) => {
  try {
    // URL of the page we want to scrape
    const url = 'https://www.logammulia.com/id';

    // Fetch the HTML of the page
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Example: Extract the title of the page
    const currentPrice = $('.current').html();
    
    // send notification
    const urlBot = "https://api.telegram.org/bot" + process.env.BOT_TOKEN + "/sendMessage?chat_id=" + process.env.BOT_CHAT_ID + "&text=" + currentPrice ;
    const response = await axios.get(urlBot);

    // Respond with the extracted data
    res.json({
      price: currentPrice,
      bot: response.data.ok
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while scraping');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});