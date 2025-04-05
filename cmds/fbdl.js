const axios = require("axios");
const { sendMessage } = require("../handles/message");

console.log("sendMessage function:", sendMessage); 

module.exports = {
  name: "fbdl",
  description: "Facebook downloader",
  role: 1,
  author: "mark",

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(" ");

    if (!prompt) {
      return sendMessage(senderId, {
        text: `Usage: fbdl [ URL ]`
      }, pageAccessToken);
    }

    try {
      const apiUrl = `https://rest-api-bot.onrender.com/api/fbdl?url=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);
      const { result } = response.data;

      console.log("Sending message with API URL:", apiUrl); 
      
      
 
      await sendMessage(senderId, {
        attachment: {
          type: "video",
          payload: {
            url: result
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error("error pa fix kay owner:", error);
      sendMessage(senderId, {
        text: `error pa fix kay owner. Please try again or check your input.`
      }, pageAccessToken);
    }
  }
};
