document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('edit-dish-form');
    const addButton = document.getElementById('add-ingredient');
    const container = document.getElementById('ingredients-container');
    
    // Obtener el nombre del plato de la URL
    const params = new URLSearchParams(window.location.search);
    const dishName = params.get('dish');
    
    if (!dishName) {
        alert('No se especificó ningún plato para editar');
        window.location.href = 'ListarPlatos.html';
        return;
    }

    // Cargar los datos del plato
    const dish = getDishByName(dishName);
    if (!dish) {
        alert('No se encontró el plato especificado');
        window.location.href = 'ListarPlatos.html';
        return;
    }

    // Función para crear una fila de ingrediente
    function createIngredientRow(ingredient = null) {
        const row = document.createElement('div');
        row.className = 'ingredient-row';
        row.innerHTML = `
            <input type="text" class="ingredient-name" placeholder="Nombre del ingrediente" required 
                value="${ingredient ? ingredient.name : ''}">
            <select class="ingredient-type" required>
                <option value="Hamburguesa" ${ingredient?.type === 'Hamburguesa' ? 'selected' : ''}>Hamburguesa</option>
                <option value="Pan" ${ingredient?.type === 'Pan' ? 'selected' : ''}>Pan</option>
                <option value="Extra" ${ingredient?.type === 'Extra' ? 'selected' : ''}>Extra</option>
            </select>
            <button type="button" class="remove-ingredient">- Eliminar Ingrediente</button>
        `;
        return row;
    }

    // Cargar el nombre del plato
    document.getElementById('dish-name').value = dish.name;

    // Cargar los ingredientes existentes
    dish.ingredients.forEach(ingredient => {
        container.appendChild(createIngredientRow(ingredient));
    });

    // Añadir nuevo ingrediente
    addButton.onclick = () => {
        container.appendChild(createIngredientRow());
    };

    // Eliminar ingrediente
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-ingredient')) {
            const rows = container.querySelectorAll('.ingredient-row');
            if (rows.length > 1) {
                e.target.closest('.ingredient-row').remove();
            } else {
                alert('Debe haber al menos un ingrediente');
            }
        }
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newName = document.getElementById('dish-name').value;
        const ingredients = [];
        
        document.querySelectorAll('.ingredient-row').forEach(row => {
            const ingredientName = row.querySelector('.ingredient-name').value;
            const ingredientType = row.querySelector('.ingredient-type').value;
            
            if (ingredientName) {
                ingredients.push({
                    name: ingredientName,
                    type: ingredientType
                });
            }
        });

        if (ingredients.length === 0) {
            alert('Por favor, añade al menos un ingrediente');
            return;
        }

        if (updateDish(dishName, newName, ingredients)) {
            alert('Plato actualizado correctamente!');
            window.location.href = 'ListarPlatos.html';
        }
    });
});