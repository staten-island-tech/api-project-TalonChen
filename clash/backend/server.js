import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
const API_KEY = process.env.CLASH_API_KEY;
app.use(cors());
app.get("/cards", async (req, res) => {
  try {
    const response = await fetch("https://api.clashroyale.com/v1/cards", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);

async function getCards() {
  const response = await fetch("http://localhost:3000/cards");
  const data = await response.json();
  console.log(data);
}

getCards();
