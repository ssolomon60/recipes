const searchInput = document.getElementById("searchInput");
const recipesContainer = document.querySelector(".recipes-container");

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const cards = recipesContainer.querySelectorAll(".recipe-card");

  cards.forEach(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "flex" : "none";
  });
});
