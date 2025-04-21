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
                    <button type="button" class="edit-dish" data-name="${dish.name}">Editar</button>
                    <button type="button" class="delete-dish" data-name="${dish.name}">Eliminar</button>
                </td>
            `;
            savedDishesTable.appendChild(row);
        });
    }

    // Manejar clicks en la tabla
    savedDishesTable.addEventListener('click', (e) => {
        const dishName = e.target.dataset.name;
        
        if (e.target.classList.contains('delete-dish')) {
            if (confirm(`¿Estás seguro de que quieres eliminar el plato "${dishName}"?`)) {
                deleteDish(dishName);
                updateSavedDishesTable();
            }
        } else if (e.target.classList.contains('edit-dish')) {
            // Redirigir a la página de edición con el nombre del plato como parámetro
            window.location.href = `EditarPlato.html?dish=${encodeURIComponent(dishName)}`;
        }
    });

    // Manejar exportación
    document.getElementById('exportButton').addEventListener('click', () => {
        exportDishes();
    });

    // Manejar importación
    const importInput = document.getElementById('importInput');
    document.getElementById('importButton').addEventListener('click', () => {
        importInput.click();
    });

    importInput.addEventListener('change', async (e) => {
        if (e.target.files.length > 0) {
            try {
                const result = await importDishes(e.target.files[0]);
                alert(`Importación completada:\n${result.total} platos procesados\n${result.added} platos nuevos añadidos`);
                updateSavedDishesTable();
                e.target.value = ''; // Limpiar el input
            } catch (error) {
                alert(error.message);
                e.target.value = ''; // Limpiar el input
            }
        }
    });

    updateSavedDishesTable();
});



