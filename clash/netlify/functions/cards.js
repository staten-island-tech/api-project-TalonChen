// netlify/functions/cards.js
import fetch from "node-fetch"; // You may need to install node-fetch

export const handler = async (event, context) => {
  const API_KEY = process.env.CLASH_API_KEY;

  try {
    const response = await fetch("https://api.clashroyale.com/v1/cards", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
