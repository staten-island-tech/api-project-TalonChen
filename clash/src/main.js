import "./style.css";
const URL = "https://api.clashroyale.com/v1/cards";

async function getData(URL) {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer API_KEY`,
      },
    });
    const data = await response.json(); //Turns Json into JS
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
