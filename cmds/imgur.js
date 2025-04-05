const axios = require("axios");
const { sendMessage } = require('../handles/message');

module.exports = {
  name: "imgur",
  description: "Uploads an image to Imgur.",
  role: 1,
  author: "Clarence and GeoDevz69",

  async execute(bot, args, authToken, event) {
    if (!event?.sender?.id) {
      console.error('Invalid event object: Missing sender ID.');
      sendMessage(bot, { text: 'Error: Missing sender ID.' }, authToken);
      return;
    }

    try {
      const senderId = event.sender.id;
      const imageUrl = await extractImageUrl(event, authToken);

      if (!imageUrl) {
        sendMessage(bot, { text: "Please reply to an image or send an image with the command to upload it to Imgur." }, authToken);
        return;
      }

      const imgurResponse = await uploadToImgur(imageUrl);

      if (imgurResponse?.uploaded?.status === "success") {
        const imgurLink = imgurResponse.uploaded.image;
        sendMessage(bot, { text: `Image uploaded to Imgur: ${imgurLink}` }, authToken);
      } else {
        sendMessage(bot, { text: "Failed to upload the image to Imgur." }, authToken);
      }
    } catch (error) {
      console.error("Error in Imgur command:", error);
      sendMessage(bot, { text: `Error: ${error.message || "Something went wrong."}` }, authToken);
    }
  }
};

async function extractImageUrl(event, authToken) {
  try {

    if (event.message.reply_to?.mid) {
      return await getRepliedImage(event.message.reply_to.mid, authToken);
    }

    if (event.message?.attachments?.[0]?.type === 'image') {
      return event.message.attachments[0].payload.url;
    }
  } catch (error) {
    console.error("Failed to extract image URL:", error);
  }
  return "";
}

async function getRepliedImage(mid, authToken) {
  try {
    const { data } = await axios.get(`https://graph.facebook.com/v21.0/${mid}/attachments`, {
      params: { access_token: authToken }
    });
    return data?.data[0]?.image_data?.url || "";
  } catch (error) {
    throw new Error("Failed to retrieve replied image.");
  }
}

async function uploadToImgur(imageUrl) {
  try {
    const apiUrl = `https://kaiz-apis.gleeze.com/api/imgur?url=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Failed to upload to Imgur:", error);
    return null;
  }
                                                                 }
