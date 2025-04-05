const axios = require("axios");
const { sendMessage } = require("../handles/message");

console.log("sendMessage function:", sendMessage); 

module.exports = {
  name: "ytmp3dl",
  description: "YouTube mp3 downloader using url",
  role: 1,
  author: "mark",

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(" ");

    if (!prompt) {
      return sendMessage(senderId, {
        text: `Usage: ytmp3dl [ URL ]`
      }, pageAccessToken);
    }

    try {
      const apiUrl = `https://apis-rho-nine.vercel.app/ytsdlmp3?q=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);
      const { title, audio } = response.data;

      console.log("Sending message with API URL:", apiUrl); 
      
      await sendMessage(senderId, {
        text: ` Title : ${title} \n Download url ${audio} \n`
      }, pageAccessToken);
      
 
      await sendMessage(senderId, {
        attachment: {
          type: "audio",
          payload: {
            url: audio
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
