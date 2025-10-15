const API_URL = "https://api.coingecko.com/api/v3/";
const MARKETS_URL = `markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=it`;
const BASE_URL = `coins/`;

const getMarkets = async () => {
  try {
    const response = await fetch(API_URL + BASE_URL + MARKETS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching markets:", error);
    return [];
  }
};

const getCoinDetails = async (id) => {
  try {
    const response = await fetch(API_URL + BASE_URL + `${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching coin details:", error);
    return null;
  }
};

export { getMarkets, getCoinDetails };
