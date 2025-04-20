document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('ingredients-table').querySelector('tbody');
    const clearButton = document.getElementById('clear-selection');
    
    // Obtener los platos seleccionados del localStorage
    let selectedDishes = new Map(JSON.parse(localStorage.getItem('selectedDishes') || '[]'));
    
    function updateTable() {
        const dishes = getDishes();
        const ingredientTotals = new Map(); // Mapa para acumular ingredientes

        // Recorrer cada plato seleccionado
        selectedDishes.forEach((quantity, dishName) => {
            const dish = dishes.find(d => d.name === dishName);
            if (dish) {
                // Multiplicar cada ingrediente por la cantidad del plato
                dish.ingredients.forEach(ingredient => {
                    const key = `${ingredient.name}-${ingredient.type}`;
                    const currentTotal = ingredientTotals.get(key) || 0;
                    ingredientTotals.set(key, currentTotal + quantity);
                });
            }
        });

        // Limpiar la tabla
        tableBody.innerHTML = '';
        
        // Definir el orden de los tipos
        const typeOrder = {
            'Pan': 1,
            'Hamburguesa': 2,
            'Extra': 3
        };

        // Convertir el mapa a array y ordenar primero por tipo y luego por nombre
        Array.from(ingredientTotals.entries())
            .sort(([keyA, _a], [keyB, _b]) => {
                const [nameA, typeA] = keyA.split('-');
                const [nameB, typeB] = keyB.split('-');
                
                // Primero ordenar por tipo según el orden definido
                const typeOrderDiff = typeOrder[typeA] - typeOrder[typeB];
                if (typeOrderDiff !== 0) return typeOrderDiff;
                
                // Si son del mismo tipo, ordenar por nombre
                return nameA.localeCompare(nameB);
            })
            .forEach(([key, count]) => {
                const [name, type] = key.split('-');
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${count}x</td>
                    <td>${name}</td>
                    <td>${type}</td>
                `;
                tableBody.appendChild(row);
            });
    }

    clearButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres limpiar la selección?')) {
            selectedDishes.clear();
            localStorage.setItem('selectedDishes', JSON.stringify(Array.from(selectedDishes.entries())));
            updateTable();
        }
    });

    // Mostrar los ingredientes inicialmente
    updateTable();
  })
