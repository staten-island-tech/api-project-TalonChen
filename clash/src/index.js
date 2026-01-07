// Global Variables: Storing in a JS Object instead of loose variables
const state = {
  clashData: [],
  filteredData: [],
  apiUrl: "http://localhost:3000/cards",
};

const cardContainer = document.querySelector("#allCards");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

// Reusable/Modern Code: Abstracted render function
const renderCards = (data) => {
  cardContainer.innerHTML = "";

  if (data.length === 0) {
    cardContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 text-xl">No cards found.</p>`;
    return;
  }

  // Array Methods: Using map to join strings (efficient for large lists)
  const cardsHtml = data
    .map(
      (card) => `
        <article class="flex flex-col items-center border p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 class="text-xl font-bold mb-2">${card.name}</h2>
            <img src="${card.iconUrls.medium}" alt="${card.name}" class="w-32 h-auto">
        </article>
    `
    )
    .join("");

  cardContainer.insertAdjacentHTML("afterbegin", cardsHtml);
};

// Promise Handling: Proper user-facing error handling
async function getData() {
  try {
    const response = await fetch(state.apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    state.clashData = data.items;
    state.filteredData = data.items;
    renderCards(state.filteredData);
  } catch (err) {
    // Alerting the user to why the request failed
    cardContainer.innerHTML = `
            <div class="col-span-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> ${err.message}. Please ensure the backend server is running.
            </div>`;
  }
}

// Form Handling: Logic to prevent blank fields and filter results
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    // Reset to all cards if empty
    state.filteredData = state.clashData;
  } else {
    // Array Methods: filter
    state.filteredData = state.clashData.filter((card) =>
      card.name.toLowerCase().includes(query)
    );
  }

  renderCards(state.filteredData);
});

// Initial Load
getData();
