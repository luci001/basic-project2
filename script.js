document.addEventListener('DOMContentLoaded', function() {
    const recipeForm = document.getElementById('recipe-form');
    const recipeNameInput = document.getElementById('recipe-name');
    const ingredientsInput = document.getElementById('ingredients');
    const preparationStepsInput = document.getElementById('preparation-steps');
    const imageUploadInput = document.getElementById('image-upload');
    const addRecipeBtn = document.getElementById('add-recipe-btn');
    const searchInput = document.getElementById('search-input');
    const recipesList = document.getElementById('recipes');

    // Load recipes from localStorage on page load
    function loadRecipes() {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipesList.innerHTML = ''; // Clear existing list
        storedRecipes.forEach(recipe => {
            const recipeItem = document.createElement('li');
            recipeItem.classList.add('recipe-item');
            recipeItem.textContent = recipe.name;
            recipesList.appendChild(recipeItem);
        });
    }

    loadRecipes(); // Call loadRecipes function on page load

    // Function to add a new recipe
    function addRecipe() {
        const recipeName = recipeNameInput.value.trim();
        const ingredients = ingredientsInput.value.trim();
        const preparationSteps = preparationStepsInput.value.trim();
        // You can handle image upload here

        if (recipeName === '' || ingredients === '' || preparationSteps === '') {
            alert('Please fill in all fields');
            return;
        }

        // Create recipe object
        const recipe = {
            name: recipeName,
            ingredients: ingredients,
            preparationSteps: preparationSteps
        };

        // Get existing recipes from localStorage
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        storedRecipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(storedRecipes));

        // Reload recipes after adding a new one
        loadRecipes();

        // Clear form fields
        recipeNameInput.value = '';
        ingredientsInput.value = '';
        preparationStepsInput.value = '';
    }

    // Event listener for Add Recipe button
    addRecipeBtn.addEventListener('click', addRecipe);

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const recipeItems = recipesList.querySelectorAll('.recipe-item');
        recipeItems.forEach(item => {
            const recipeName = item.textContent.toLowerCase();
            if (recipeName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Click event for recipe items to show details
    recipesList.addEventListener('click', function(event) {
        if (event.target && event.target.matches('.recipe-item')) {
            const recipeName = event.target.textContent;
            const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
            const selectedRecipe = storedRecipes.find(recipe => recipe.name === recipeName);
            if (selectedRecipe) {
                alert(`Ingredients:\n${selectedRecipe.ingredients}\n\nPreparation Steps:\n${selectedRecipe.preparationSteps}`);
            }
        }
    });
});
