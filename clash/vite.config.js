import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
});

const URL = "https://api.clashroyale.com/v1/cards";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json(); //Turns Json into JS
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
getData(URL);
