const axios = require('axios');
const { sendMessage } = require('../handles/message'); // Adjust the path as necessary

module.exports = {
  name: 'scrape',
  description: 'Scrape the HTML content of a given URL',
  author: 'Clarence',
  role: 1,
  async execute(senderId, args, pageAccessToken) {
    if (args.length === 0) {
      await sendMessage(senderId, { text: 'Please provide a URL to scrape.' }, pageAccessToken);
      return;
    }

    const url = args[0];
    try {
      const apiUrl = `https://kaiz-apis.gleeze.com/api/scrape?url=${encodeURIComponent(url)}`;
      const response = await axios.get(apiUrl);
      const htmlData = response.data.data;

  
      await sendResponseInChunks(senderId, htmlData, pageAccessToken);
    } catch (error) {
      console.error('Error calling Scrape API:', error);
      await sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};

async function sendResponseInChunks(senderId, text, pageAccessToken) {
  const maxMessageLength = 2000; 
  if (text.length > maxMessageLength) {
    const messages = splitMessageIntoChunks(text, maxMessageLength);
    for (const message of messages) {
      await sendMessage(senderId, { text: message }, pageAccessToken);
    }
  } else {
    await sendMessage(senderId, { text }, pageAccessToken);
  }
}

function splitMessageIntoChunks(message, chunkSize) {
  const chunks = [];
  let chunk = '';
  const words = message.split(' ');

  for (const word of words) {
    if ((chunk + word).length > chunkSize) {
      chunks.push(chunk.trim());
      chunk = '';
    }
    chunk += `${word} `;
  }

  if (chunk) {
    chunks.push(chunk.trim());
  }

  return chunks;
}
