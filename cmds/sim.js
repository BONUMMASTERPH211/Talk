const axios = require('axios');
const { sendMessage } = require('../handles/message'); // Adjust this path as needed

module.exports = {
  name: 'sim',
  description: 'talk with simsimi',
  author: 'Clarence',
  role: 1,
  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');

    try {
      const apiUrl = `https://simsimi-api-new2.onrender.com/sim?q=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);
      const text = response.data.respond;


      await sendResponseInChunks(senderId, text, pageAccessToken);
    } catch (error) {
      console.error('Error calling sim:', error);
      await sendMessage(senderId, { text: 'Please enter your question' }, pageAccessToken);
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
