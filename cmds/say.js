const axios = require("axios");
const { sendMessage } = require("../handles/message");

console.log("sendMessage function:", sendMessage); 

module.exports = {
  name: "say",
  description: "Generate a voice message based on the prompt",
  role: 1,
  author: "developer",

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(" ");

    if (!prompt) {
      return sendMessage(senderId, {
        text: `Usage: say [your message]`
      }, pageAccessToken);
    }

    try {
      
      const apiUrl = `https://api.joshweb.click//api/aivoice?q=${encodeURIComponent(prompt)}&id=8`;

      console.log("Sending message with API URL:", apiUrl); 

 
      await sendMessage(senderId, {
        attachment: {
          type: "audio",
          payload: {
            url: apiUrl
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error("Error generating voice message:", error);
      sendMessage(senderId, {
        text: `Error generating voice message. Please try again or check your input.`
      }, pageAccessToken);
    }
  }
};
