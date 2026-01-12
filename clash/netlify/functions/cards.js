export const handler = async (event, context) => {
  // 1. Check if the API key exists at all
  const API_KEY = process.env.CLASH_API_KEY;
  console.info("Function started. API Key exists:", !!API_KEY);

  try {
    const response = await fetch("https://api.clashroyale.com/v1/cards", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });

    // 2. If it's not a 200 OK, find out WHY
    if (!response.ok) {
      const errorText = await response.text(); // This captures the API's specific error message
      console.error(`Clash API Error (${response.status}):`, errorText);

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `API returned ${response.status}`,
          details: errorText,
        }),
      };
    }

    const data = await response.json();
    console.info("Successfully fetched cards:", data.items?.length);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("FUNCTION CRASHED:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
