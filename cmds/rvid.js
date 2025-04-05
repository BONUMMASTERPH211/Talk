const axios = require('axios');
const { sendMessage } = require('../handles/message');

module.exports = {
  name: "rvid",
  description: "Send a random  video",
  author: "mark",

  async execute(senderId, args, pageAccessToken) {
    try {
      const response = await axios.get('https://random-video-api-sjvq.onrender.com/vid');
      const { link: link, random, author, } = response.data;

      await sendMessage(senderId, {
        text: ` Username: ${random}\n💟 author: ${author}\n`
      }, pageAccessToken);

      await sendMessage(senderId, {
        attachment: {
          type: "video",
          payload: {
            url: link
          }
        }
      }, pageAccessToken);
    } catch (error) {
      console.error("nag error chat mo si owner:", error);
      sendMessage(senderId, {
        text: `nag error chat mo si owner. Error: ${error.message || "Unknown error"}`
      }, pageAccessToken);
    }
  }
};
