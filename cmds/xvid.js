const axios = require("axios");
const { sendMessage } = require("../handles/message");

console.log("sendMessage function:", sendMessage); 

module.exports = {
  name: "xvid",
  description: "xvideos downloader",
  role: 1,
  author: "mark",

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(" ");

    if (!prompt) {
      return sendMessage(senderId, {
        text: `Usage: xvid url`
      }, pageAccessToken);
    }

    try {
      const apiUrl = `https://apis-markdevs69v2.onrender.com/new/xnxx/download?url=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);
      const { result, name, thumbnailUrl } = response.data;

      console.log("Sending message with API URL:", apiUrl); 
      
      await sendMessage(senderId, {
        text: ` Title : ${name}\ntest :${result}\ntest2 :${thumbnailUrl}`
      }, pageAccessToken);
      
 
      

    } catch (error) {
      console.error("error pa fix kay owner:", error);
      sendMessage(senderId, {
        text: `error pa fix kay owner. Please try again or check your input.`
      }, pageAccessToken);
    }
  }
};
