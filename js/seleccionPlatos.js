document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el Map con los platos guardados en localStorage
    const selectedPlates = new Map(JSON.parse(localStorage.getItem('selectedDishes') || '[]'));

    function updatePlatesDisplay() {
        const dishes = getDishes();
        const panPlates = document.getElementById('pan-plates');
        const hamburguesaPlates = document.getElementById('hamburguesa-plates');
        const extraPlates = document.getElementById('extra-plates');

        // Limpiar las listas
        panPlates.innerHTML = '';
        hamburguesaPlates.innerHTML = '';
        extraPlates.innerHTML = '';

        // Clasificar y mostrar los platos
        dishes.forEach(dish => {
            const plateButton = document.createElement('button');
            plateButton.className = `plate-button ${selectedPlates.has(dish.name) ? 'selected' : ''}`;
            plateButton.textContent = dish.name;
            
            plateButton.addEventListener('click', () => togglePlateSelection(dish));

            // Determinar el tipo de plato basado en sus ingredientes
            const hasHamburguesa = dish.ingredients.some(ing => ing.type === 'Hamburguesa');
            const hasPan = dish.ingredients.some(ing => ing.type === 'Pan');
            const hasExtra = dish.ingredients.some(ing => ing.type === 'Extra');

            if (hasHamburguesa) {
                hamburguesaPlates.appendChild(plateButton);
            } else if (hasPan) {
                panPlates.appendChild(plateButton);
            } else if (hasExtra) {
                extraPlates.appendChild(plateButton);
            }
        });

        updateSelectedPlatesList();
    }

    function togglePlateSelection(dish) {
        if (selectedPlates.has(dish.name)) {
            selectedPlates.delete(dish.name);
        } else {
            selectedPlates.set(dish.name, 1);
        }
        // Guardar en localStorage cada vez que se modifica la selección
        localStorage.setItem('selectedDishes', JSON.stringify(Array.from(selectedPlates.entries())));
        updatePlatesDisplay();
    }

    function updateSelectedPlatesList() {
        const selectedPlatesList = document.getElementById('selected-plates-list');
        selectedPlatesList.innerHTML = '';

        selectedPlates.forEach((quantity, plateName) => {
            const plateItem = document.createElement('div');
            plateItem.className = 'selected-plate-item';
            
            plateItem.innerHTML = `
                <span>${plateName}</span>
                <div>
                    <input type="number" value="${quantity}" min="1" style="width: 60px"
                           onchange="updatePlateQuantity('${plateName}', this.value)">
                    <button onclick="removePlate('${plateName}')" class="delete-dish">X</button>
                </div>
            `;
            selectedPlatesList.appendChild(plateItem);
        });
    }

    window.updatePlateQuantity = (plateName, quantity) => {
        selectedPlates.set(plateName, parseInt(quantity) || 1);
        localStorage.setItem('selectedDishes', JSON.stringify(Array.from(selectedPlates.entries())));
        updateSelectedPlatesList();
    };

    window.removePlate = (plateName) => {
        selectedPlates.delete(plateName);
        localStorage.setItem('selectedDishes', JSON.stringify(Array.from(selectedPlates.entries())));
        updatePlatesDisplay();
    };

    document.getElementById('calculate-ingredients').addEventListener('click', () => {
        window.location.href = 'ListarObjetos.html';
    });

    // Cargar platos inicialmente
    updatePlatesDisplay();
});
