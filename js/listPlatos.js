document.addEventListener('DOMContentLoaded', () => {
    const savedDishesTable = document.getElementById('saved-dishes').querySelector('tbody');

    function updateSavedDishesTable() {
        const dishes = getDishes();
        savedDishesTable.innerHTML = '';
        
        // Definir el orden de los tipos
        const typeOrder = {
            'Pan': 1,
            'Hamburguesa': 2,
            'Extra': 3
        };

        // Ordenar los platos según el tipo del primer ingrediente
        const sortedDishes = dishes.sort((a, b) => {
            const typeA = a.ingredients[0]?.type || '';
            const typeB = b.ingredients[0]?.type || '';
            
            // Obtener el orden numérico de cada tipo
            const orderA = typeOrder[typeA] || 999;
            const orderB = typeOrder[typeB] || 999;
            
            // Ordenar por tipo
            const typeOrderDiff = orderA - orderB;
            if (typeOrderDiff !== 0) return typeOrderDiff;
            
            // Si son del mismo tipo, ordenar por nombre del plato
            return a.name.localeCompare(b.name);
        });
        
        sortedDishes.forEach(dish => {
            const row = document.createElement('tr');
            const ingredientsList = dish.ingredients
                .map(ing => `${ing.name} (${ing.type})`)
                .join(', ');

            row.innerHTML = `
                <td>${dish.name}</td>
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

