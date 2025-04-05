const axios = require("axios");
const { sendMessage } = require('../handles/message');

module.exports = {
  name: "tiksearch",
  description: "Search for TikTok videos",
  role: 1,
  author: "French Clarence Mangigo",

  async execute(senderId, args, pageAccessToken) {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return sendMessage(senderId, { text: "Usage: tiksearch <search text>" }, pageAccessToken);
      }

      const response = await axios.get(`https://apis-markdevs69v2.onrender.com/new/api/tiksearch?search=${encodeURIComponent(searchQuery)}`);
      const videos = response.data.data.videos;

      if (!videos || videos.length === 0) {
        return sendMessage(senderId, { text: "No videos found for the given search query." }, pageAccessToken);
      }


      const videoData = videos[0];
      const videoUrl = videoData.play;

      const message = `📹 Tiksearch Result:\n\n👤 Post by: ${videoData.author.nickname}\n🔗 Username: ${videoData.author.unique_id}\n\n📝 Title: ${videoData.title}`;

      sendMessage(senderId, { text: message }, pageAccessToken);

      sendMessage(senderId, {
        attachment: {
          type: 'video',
          payload: {
            url: videoUrl,
            is_reusable: true
          }
        }
      }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error);
      sendMessage(senderId, { text: "An error occurred while processing the request." }, pageAccessToken);
    }
  }
};
      
