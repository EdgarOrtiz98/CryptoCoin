import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

export const fetchCryptoData = async (vs_currency = "usd", per_page = 20) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        vs_currency,
        per_page,
        order: "market_cap_desc",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};