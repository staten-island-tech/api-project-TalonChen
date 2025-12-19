// index.js
const URL = "https://api.clashroyale.com/v1/cards";

// Put your real token here OR use an environment variable
const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjMxZTFmMmFkLWU5NWQtNDlmMS04ODBkLWE5ZDg0NzQxMjQzNSIsImlhdCI6MTc2NjE2ODY0MCwic3ViIjoiZGV2ZWxvcGVyLzI5MjkwMDUxLWYxYWItNjkxMi1kYWJjLTMxMDgwOTNjZmQ5ZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMDAuMTAxLjY1LjEwNiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.owWqWgNo7oBXWsbyoVmkSDTVMcAUmQ1SngxkwokcS8gLG_efIqAVYq3kzSBVCvyjZa9bHw-bPrvtaZvClv22fA";

async function getData() {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("HTTP Error:", response.status);
      const text = await response.text();
      console.error(text);
      return;
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

getData();
