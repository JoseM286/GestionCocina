document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('dish-selector');
    const quantityInput = document.getElementById('dish-quantity');
    const addButton = document.getElementById('add-dish');
    const tableBody = document.getElementById('ingredients-table').querySelector('tbody');
    const clearButton = document.getElementById('clear-selection');
    
    // Objeto para mantener el seguimiento de los platos seleccionados y sus cantidades
    let selectedDishes = new Map(JSON.parse(localStorage.getItem('selectedDishes') || '[]')); 
    
    // Función para guardar el estado actual en localStorage
    function saveState() {
        localStorage.setItem('selectedDishes', JSON.stringify(Array.from(selectedDishes.entries())));
    }
    
    // Cargar platos en el selector
    function loadDishes() {
        const dishes = getDishes();
        selector.innerHTML = '<option value="">-- Selecciona un plato --</option>';
        
        dishes.forEach(dish => {
            const option = document.createElement('option');
            option.value = dish.name;
            option.textContent = dish.name;
            selector.appendChild(option);
        });
    }

    // Actualizar tabla con todos los ingredientes acumulados
    function updateTable() {
        const dishes = getDishes();
        const grouped = {};

        // Acumular ingredientes de todos los platos seleccionados
        selectedDishes.forEach((quantity, dishName) => {
            const dish = dishes.find(d => d.name === dishName);
            if (dish) {
                dish.ingredients.forEach(ing => {
                    const key = `${ing.name}-${ing.type}`;
                    grouped[key] = (grouped[key] || 0) + (quantity * 1); // Multiplicar por la cantidad del plato
                });
            }
        });

        // Actualizar tabla
        tableBody.innerHTML = '';
        Object.entries(grouped).forEach(([key, count]) => {
            const [name, type] = key.split('-');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${count}x</td>
                <td>${name}</td>
                <td>${type}</td>
            `;
            tableBody.appendChild(row);
        });

        saveState(); // Guardar el estado cada vez que se actualiza la tabla
    }

    // Eventos
    addButton.addEventListener('click', () => {
        const selectedValue = selector.value;
        const quantity = parseInt(quantityInput.value) || 1;
        
        if (selectedValue && quantity > 0) {
            const currentQuantity = selectedDishes.get(selectedValue) || 0;
            selectedDishes.set(selectedValue, currentQuantity + quantity);
            updateTable();
            
            // Resetear el formulario
            selector.value = '';
            quantityInput.value = '1';
        }
    });

    clearButton.addEventListener('click', () => {
        selectedDishes.clear();
        updateTable();
        selector.value = '';
        quantityInput.value = '1';
    });

    // Cargar platos inicialmente
    loadDishes();
    updateTable(); // Cargar la tabla con los datos guardados
  })
