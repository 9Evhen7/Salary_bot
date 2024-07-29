const axios = require("axios");
const { getToken } = require("./getToken");

const uploadPhoto = async (IdList, params, fileId, botToken) => {
  const { siteId, itemId, tenantId } = IdList;
  const token = await getToken(tenantId, params);

  const fileInfoUrl = `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`;
  const fileInfoResponse = await axios.get(fileInfoUrl);
  const filePath = fileInfoResponse.data.result.file_path;

  const fileDownloadUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;

  const url = `https://graph.microsoft.com/v1.0/drives/b!eNry5s6Yd0GYEAc_fUNHwTCvO9kp0cZFruzeIk5LV8AfJHF6JGZbQ7GOMmHMPfdT/root:/Sheets_for_bot/Photos/${filePath
    .split("/")
    .pop()}:/content`;

  try {
    const fileContentResponse = await axios.get(fileDownloadUrl, {
      responseType: "arraybuffer",
    });

    const response = await axios.put(url, fileContentResponse.data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "image/jpg",
      },
    });

    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

module.exports = {
  uploadPhoto,
};
