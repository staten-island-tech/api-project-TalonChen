const URL = "http://localhost:3000/cards";

async function getData() {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      console.error("HTTP error:", response.status);
      return;
    }

    const data = await response.json();
    console.log("Success! Data from backend:", data);
  } catch (err) {
    console.error("Connection error:", err);
  }
}

getData();
