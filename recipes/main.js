import recipes from './recipes.mjs';

const recipeSection = document.getElementById('recipe-section');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('recipe-search');

function displayRecipes(filteredRecipes) {
    recipeSection.innerHTML = '';
    filteredRecipes.forEach(recipe => {
        const recipeHTML = `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.name}">
                <div class="recipe-info">
                    <div class="tags">
                        ${recipe.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <h2>${recipe.name}</h2>
                    <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                        ${'⭐'.repeat(Math.floor(recipe.rating))}${'☆'.repeat(5 - Math.floor(recipe.rating))}
                    </span>
                    <p>${recipe.description}</p>
                </div>
            </div>
        `;
        recipeSection.insertAdjacentHTML('beforeend', recipeHTML);
    });
}

displayRecipes([recipes[0]]);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();
    const filtered = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query))
    );
    displayRecipes(filtered);
});