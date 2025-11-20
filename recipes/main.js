import recipes from './recipes.mjs';

const recipeSection = document.getElementById('recipe-section');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('recipe-search');

function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

function getRandomRecipe() {
    const index = getRandomNumber(recipes.length);
    return recipes[index];
}

function getRandomListEntry(list) {
    const index = getRandomNumber(list.length);
    return list[index];
}

function tagsTemplate(tags) {
    return tags.map(tag => `<span>${tag}</span>`).join('');
}

function ratingTemplate(rating) {
    let html = `<span
        class="rating"
        role="img"
        aria-label="Rating: ${rating} out of 5 stars"
    >`;

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }

    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `
<div class="recipe-card">
    <img src="${recipe.image}" alt="${recipe.name}">
    <div class="recipe-info">
        <div class="tags">
            ${tagsTemplate(recipe.tags)}
        </div>
        <h2>${recipe.name}</h2>
        ${ratingTemplate(recipe.rating)}
        <p>${recipe.description}</p>
    </div>
</div>`;
}

function renderRecipes(recipeList) {
    recipeSection.innerHTML = '';
    const html = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    recipeSection.innerHTML = html;
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

init();

function filterRecipes(query) {
    const filtered = recipes.filter(recipe => {
        const inName = recipe.name.toLowerCase().includes(query);
        const inDescription = recipe.description.toLowerCase().includes(query);
        const inTags = recipe.tags.some(tag => tag.toLowerCase().includes(query));
        const inIngredients = recipe.recipeIngredient.some(ing => ing.toLowerCase().includes(query));

        return inName || inDescription || inTags || inIngredients;    
    });
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
}

function searchHandler(event) {
    event.preventDefault();

    const query = searchInput.value.toLowerCase().trim();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

searchForm.addEventListener('submit', searchHandler);