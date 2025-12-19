const URL = "https://api.clashroyale.com/v1/cards";
const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA2NzRlYWZhLTM0YzUtNGJjZC05ZjdmLTE2NDVlYjY1MDZhZiIsImlhdCI6MTc2NjE3MDAzOSwic3ViIjoiZGV2ZWxvcGVyLzI5MjkwMDUxLWYxYWItNjkxMi1kYWJjLTMxMDgwOTNjZmQ5ZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNjUuMTU1LjE3MC45Il0sInR5cGUiOiJjbGllbnQifV19.JO8r9Q8D6evp00ch6CCc-o5RoprYNAvY1oSJLsOPPJMNSOa4gC7nE9hYj0EeycIjollv1e1CXH_exfbs5vmiog";

async function getData() {
  try {
    const response = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("HTTP error:", response.status);
      console.error(await response.text());
      return;
    }

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

getData();
