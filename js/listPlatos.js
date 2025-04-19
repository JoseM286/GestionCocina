document.addEventListener('DOMContentLoaded', () => {
    const savedDishesTable = document.getElementById('saved-dishes').querySelector('tbody');

    function updateSavedDishesTable() {
        const dishes = getDishes();
        savedDishesTable.innerHTML = '';
        
        dishes.forEach(dish => {
            const row = document.createElement('tr');
            const createdAt = new Date(dish.createdAt).toLocaleDateString();
            const ingredientsList = dish.ingredients
                .map(ing => `${ing.name} (${ing.type})`)
                .join(', ');

            row.innerHTML = `
                <td>${dish.name}</td>
                <td>${createdAt}</td>
                <td>${ingredientsList}</td>
                <td>
                    <button type="button" class="delete-dish" data-name="${dish.name}">Eliminar</button>
                </td>
            `;
            savedDishesTable.appendChild(row);
        });
    }

    // Eliminar plato
    savedDishesTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-dish')) {
            const dishName = e.target.dataset.name;
            if (confirm(`¿Estás seguro de que quieres eliminar el plato "${dishName}"?`)) {
                deleteDish(dishName);
                updateSavedDishesTable();
            }
        }
    });

    // Cargar platos existentes al iniciar
    updateSavedDishesTable();
});