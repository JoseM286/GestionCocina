document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dish-form');
    const addButton = document.getElementById('add-ingredient');
    const container = document.getElementById('ingredients-container');
    const savedDishesTable = document.getElementById('saved-dishes').querySelector('tbody');

    // Función para actualizar la tabla de platos guardados
    function updateSavedDishesTable() {
        const dishes = getDishes();
        savedDishesTable.innerHTML = '';
        
        dishes.forEach(dish => {
            const row = document.createElement('tr');
            const createdAt = new Date(dish.createdAt).toLocaleDateString();
            row.innerHTML = `
                <td>${dish.name}</td>
                <td>${createdAt}</td>
                <td>
                    <button type="button" class="delete-dish" data-name="${dish.name}">Eliminar</button>
                </td>
            `;
            savedDishesTable.appendChild(row);
        });
    }

    // Añadir nuevo ingrediente
    addButton.addEventListener('click', () => {
        const row = document.createElement('div');
        row.className = 'ingredient-row';
        row.innerHTML = `
            <input type="text" class="ingredient-name" placeholder="Nombre del ingrediente" required>
            <select class="ingredient-type" required>
                <option value="hamburguesa">Hamburguesa</option>
                <option value="patatas">Patatas</option>
                <option value="queso">Queso</option>
                <option value="salsa">Salsa</option>
                <option value="extra">Extra</option>
            </select>
            <button type="button" class="remove-ingredient">-</button>
        `;
        container.appendChild(row);
    });

    // Eliminar ingrediente
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-ingredient')) {
            const rows = document.querySelectorAll('.ingredient-row');
            if (rows.length > 1) {
                e.target.closest('.ingredient-row').remove();
            } else {
                alert('Debe haber al menos un ingrediente');
            }
        }
    });

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

    // Guardar plato
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const dishName = document.getElementById('dish-name').value;
        const ingredients = [];
        
        document.querySelectorAll('.ingredient-row').forEach(row => {
            ingredients.push({
                name: row.querySelector('.ingredient-name').value,
                type: row.querySelector('.ingredient-type').value
            });
        });

        saveDish(dishName, ingredients);
        alert('Plato guardado correctamente!');
        form.reset();
        
        // Dejar solo una fila de ingredientes
        while (container.children.length > 1) {
            container.removeChild(container.lastChild);
        }

        // Actualizar la tabla de platos
        updateSavedDishesTable();
    });

    // Cargar platos existentes al iniciar
    updateSavedDishesTable();
  });
