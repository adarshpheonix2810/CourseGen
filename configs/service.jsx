const axios = require("axios");

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

const getVideos = async (query) => {
    try {
        if (!query) throw new Error("Search query is required!");

        const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        if (!apiKey) throw new Error("YouTube API key is missing!");

        const params = {
            part: "snippet",
            q: query,
            maxResults: 1,
            type: "video",
            key: apiKey
        };

        const resp = await axios.get(`${YOUTUBE_BASE_URL}/search`, { params });
        return resp.data.items;
    } catch (error) {
        console.error("Error fetching YouTube videos:", error.response?.data || error.message);
        return [];
    }
};

export default {
    getVideos
};
