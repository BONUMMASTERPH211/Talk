const axios = require('axios');
const { sendMessage } = require('../handles/message');

module.exports = {
  name: "rwords",
  description: "Send a random  words",
  author: "mark",

  async execute(senderId, args, pageAccessToken) {
    try {
      const response = await axios.get('https://random-hugot-api.onrender.com/random');
      const { random, author, } = response.data;

      await sendMessage(senderId, {
        text: ` 🤣Random: ${random} \n🤣 author: ${author}\n`
      }, pageAccessToken);

      
    } catch (error) {
      console.error("nag error chat mo si owner:", error);
      sendMessage(senderId, {
        text: `nag error chat mo si owner. Error: ${error.message || "Unknown error"}`
      }, pageAccessToken);
    }
  }
};
