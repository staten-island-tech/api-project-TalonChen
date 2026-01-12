// Note: In Netlify Functions, you don't need to 'listen' to a port.
// The handler function is triggered automatically by the URL.

export const handler = async (event, context) => {
  const API_KEY = process.env.CLASH_API_KEY;

  try {
    const response = await fetch("https://api.clashroyale.com/v1/cards", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch from Clash API" }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        // These headers help prevent CORS issues during testing
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
