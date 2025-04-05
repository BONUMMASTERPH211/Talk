const axios = require("axios");
const { sendMessage } = require("../handles/message");

console.log("sendMessage function:", sendMessage); 

module.exports = {
  name: "yts",
  description: "YouTube mp3 search",
  role: 1,
  author: "mark",

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(" ");

    if (!prompt) {
      return sendMessage(senderId, {
        text: `Usage: yts [title] \n Example: yts glue song`
      }, pageAccessToken);
    }

    try {
      const apiUrl = `https://dlvc.vercel.app/yt-audio?search=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);
      const { title, downloadUrl } = response.data;

      console.log("Sending message with API URL:", apiUrl); 
      
      await sendMessage(senderId, {
        text: ` Title : ${title} \n Download url ${downloadUrl}\n`
      }, pageAccessToken);
      
 
      await sendMessage(senderId, {
        attachment: {
          type: "audio",
          payload: {
            url: downloadUrl
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
