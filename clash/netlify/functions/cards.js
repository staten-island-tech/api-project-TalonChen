export const handler = async (event, context) => {
  // 1. Log exactly what we are seeing (without showing the whole secret)
  const rawKey = process.env.CLASH_API_KEY;
  const keyLength = rawKey ? rawKey.length : 0;
  console.log(`DEBUG: Key exists: ${!!rawKey} | Length: ${keyLength}`);

  if (!rawKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          "Environment Variable CLASH_API_KEY is missing in Netlify settings.",
      }),
    };
  }

  try {
    const response = await fetch("https://proxy.royaleapi.dev/v1/cards", {
      method: "GET",
      headers: {
        // We use .replace to remove any accidental invisible characters or newlines
        Authorization: `Bearer ${rawKey.replace(/\s/g, "")}`,
        Accept: "application/json",
      },
    });

    const text = await response.text();
    console.log(`DEBUG: Response Status: ${response.status}`);

    if (!response.ok) {
      console.error("DEBUG: API rejected request:", text);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Auth Failure", details: text }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: text,
    };
  } catch (err) {
    console.error("DEBUG: Fetch Crash:", err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
