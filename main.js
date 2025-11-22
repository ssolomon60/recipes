import recipes from './recipes.mjs';

const searchInput = document.getElementById("searchInput");
const recipesContainer = document.querySelector(".recipes-container");

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  return list[random(list.length)];
}

function tagsTemplate(tags) {
  return tags.map(tag => `<li>${tag}</li>`).join("");
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    html += i <= rating ? `<span aria-hidden="true" class="icon-star">⭐</span>` : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}">
      <h2>${recipe.name}</h2>
      ${ratingTemplate(recipe.rating)}
      <ul class="recipe-tags">${tagsTemplate(recipe.tags)}</ul>
      <p class="description">${recipe.description}</p>
    </article>
  `;
}

function renderRecipes(recipeList) {
  recipesContainer.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join("");
}

function filterRecipes(query) {
  const filtered = recipes.filter(recipe => {
    const searchLower = query.toLowerCase();
    const inName = recipe.name.toLowerCase().includes(searchLower);
    const inDescription = recipe.description.toLowerCase().includes(searchLower);
    const inTags = recipe.tags.some(tag => tag.toLowerCase().includes(searchLower));
    return inName || inDescription || inTags;
  });
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  renderRecipes(filterRecipes(query));
});

function init() {
  const randomRecipe = getRandomListEntry(recipes);
  renderRecipes([randomRecipe]);
}

init();
