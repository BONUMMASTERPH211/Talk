//Eto okay nato test mo kung working 

const axios = require("axios");
const { sendMessage } = require("../handles/message");

console.log("sendMessage function:", sendMessage);

module.exports = {
  name: "post",
  description: "Post a message to the Facebook Page",
  role: 1,
  author: "Mark Martinez",

  async execute(senderId, args, pageAccessToken) {
    const message = args.join(" ");

    if (!message) {
      return sendMessage(senderId, {
        text: `Usage: post [your message]`
      }, pageAccessToken);
    }

    try {
      const PAGE_ID = "530043216861391"; // Your Facebook Page ID

      const apiUrl = `https://graph.facebook.com/v21.0/${PAGE_ID}/feed`;

      console.log("Posting to Facebook Page:", apiUrl);

      const response = await axios.post(
        apiUrl,
        { message },
        {
          headers: {
            Authorization: `Bearer ${pageAccessToken}`,
          },
        }
      );

      console.log("✅ Posted Successfully!", response.data);

      sendMessage(senderId, {
        text: `✅ Successfully Posted: "${message}"\n🔗 Post ID: ${response.data.id}`
      }, pageAccessToken);

    } catch (error) {
      console.error("❌ Error posting to Facebook:", error.response?.data || error.message);
      sendMessage(senderId, {
        text: `❌ Error posting to Facebook. Please try again later.`
      }, pageAccessToken);
    }
  }
};
