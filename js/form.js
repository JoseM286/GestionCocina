document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const form = document.getElementById('dish-form');
    const addButton = document.getElementById('add-ingredient');
    const container = document.getElementById('ingredients-container');

    // Función para añadir nuevo ingrediente
    function addNewIngredient() {
        const row = document.createElement('div');
        row.className = 'ingredient-row';
        row.innerHTML = `
            <input type="text" class="ingredient-name" placeholder="Nombre del ingrediente" required>
            <select class="ingredient-type" required>
                <option value="Hamburguesa">Hamburguesa</option>
                <option value="Pan">Pan</option>
                <option value="Extra">Extra</option>
            </select>
            <button type="button" class="remove-ingredient">- Eliminar Ingrediente</button>
        `;
        container.appendChild(row);
    }

    // Añadir el evento click al botón
    if (addButton) {
        addButton.onclick = addNewIngredient;
    }

    // Eliminar ingrediente
    if (container) {
        container.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-ingredient')) {
                const rows = container.querySelectorAll('.ingredient-row');
                if (rows.length > 1) {
                    e.target.closest('.ingredient-row').remove();
                } else {
                    alert('Debe haber al menos un ingrediente');
                }
            }
        });
    }

    // Manejar el envío del formulario
    if (form) {
        form.addEventListener('submit', function(e) {
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
            
            // Limpiar los campos del primer ingrediente
            const firstRow = container.querySelector('.ingredient-row');
            if (firstRow) {
                firstRow.querySelector('.ingredient-name').value = '';
                firstRow.querySelector('.ingredient-type').value = 'hamburguesa';
            }
        });
    }
  });
